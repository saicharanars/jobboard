import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UserTokenDto } from '../auth/dto/userTokenDto';
import { EntityManager, Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Application, statusEnum } from './entities/application.entity';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { ApplicationDto } from './dto/application.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { userApplicationsDto } from './dto/userapplication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { EventsGateway } from '../events/events.gateway';
import { UpdateEventDto } from '../events/dto/update-event.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly entitymanager: EntityManager,
    private readonly jobsService: JobsService,
    private readonly eventsservice: EventsGateway,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
    user: UserTokenDto,
    jobid: string,
  ) {
    const userentity = await this.entitymanager.findOne(User, {
      where: { id: user.id },
    });

    const job = await this.entitymanager.findOne(Job, {
      where: { id: jobid },
      relations: ['applications', 'applications.user'],
    });
    const foundApplicationUser = job.applications.find(
      (app) => app.user.id === user.id,
    );
    if (foundApplicationUser) {
      throw new NotAcceptableException('you already applied for the job');
    }

    console.log(foundApplicationUser);
    if (!job) {
      return new NotFoundException('job not found');
    }

    const application = this.entitymanager.create(
      Application,
      createApplicationDto,
    );
    application.user = userentity;
    application.job = job;
    const savedApplication = await this.entitymanager.save(application);

    return {
      application: plainToClass(ApplicationDto, savedApplication),
      message: 'Successfully save application',
    };
  }

  async findAll(user: UserTokenDto, skip?: number, take?: number) {
    console.log(user);

    const queryBuilder = this.entitymanager
      .createQueryBuilder(Application, 'application')
      .where('application.user.id = :userId', { userId: user.id })
      .orderBy('application.createdDate', 'DESC')
      .leftJoinAndSelect('application.job', 'job');

    if (typeof skip === 'number' && typeof take === 'number') {
      queryBuilder.skip(skip).take(take);
    }

    const [applications, total] = await queryBuilder.getManyAndCount();

    return {
      applications: plainToInstance(userApplicationsDto, applications),
      total,
      message: 'Successfully retrieved applications',
    };
  }
  async findAllApplicants(user: UserTokenDto) {
    const query = this.applicationRepository
      .createQueryBuilder('application')
      .select([
        'application.id',
        'application.status',
        'application.createdDate',
        'application.resume_url',
        'application.answers',
        'job.id',
        'job.job_role',
        'job.category',
        'job.questions',
        'applicant.id',
        'applicant.name',
        'applicant.email',
        'applicant.mobile_number',
      ])
      .innerJoin('application.job', 'job')
      .innerJoin('job.user', 'employer')
      .leftJoin('application.user', 'applicant')
      .where('employer.id = :employerId', { employerId: user.id })
      .andWhere('employer.role = :employerRole', {
        employerRole: UserRole.JOB_EMPLOYER,
      });
    const applications = await query.getMany();
    const count = await this.countApplicationsByCategory(user.id);
    console.log('<<<<<<<<<<', count);

    return {
      // applications: plainToInstance(ApplicationDto, applications),
      applications: applications,
      message: 'Successfully retrieved all applications for employer',
    };
  }

  async findOne(id: string) {
    const application = await this.entitymanager.findOne(Application, {
      where: { id: id },
      relations: ['job'],
    });
    return {
      job: application,
      message: 'sucessfuly retrieved job',
    };
  }

  async remove(applicationid: string, user: UserTokenDto) {
    const application = await this.entitymanager.findOne(Application, {
      where: { id: applicationid },
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to remove this application',
      );
    }

    const result = await this.entitymanager.remove(Application, application);
    return { message: 'Application successfully removed', result };
  }
  async countPending(user: UserTokenDto) {
    const result = await this.entitymanager
      .createQueryBuilder(Application, 'application')
      .select('application.status', 'status')
      .addSelect('COUNT(application.id)', 'count')
      .where('application.userId = :userId', { userId: user.id })
      .groupBy('application.status')
      .getRawMany();
    console.log(result);

    const counts: Record<statusEnum, number> = Object.values(statusEnum).reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<statusEnum, number>,
    );

    result.forEach((row) => {
      counts[row.status as statusEnum] = parseInt(row.count, 10);
    });
    console.log(counts);
    return {
      status_counts: counts,
      message: 'sucessfuly retrieved counts',
    };
  }
  async countApplicationsByCategory(employerId: string) {
    const category = await this.entitymanager
      .createQueryBuilder(Application, 'application')
      .innerJoin('application.job', 'job')
      .innerJoin('job.user', 'user')
      .select('job.category', 'category')
      .addSelect('COUNT(application.id)', 'count')
      .where('user.id = :employerId', { employerId })
      .andWhere('user.role = :role', { role: UserRole.JOB_EMPLOYER })
      .groupBy('job.category')
      .getRawMany();

    const status = await this.entitymanager
      .createQueryBuilder(Application, 'application')
      .innerJoin('application.job', 'job')
      .innerJoin('job.user', 'user')
      .select('application.status', 'status')
      .addSelect('COUNT(application.id)', 'count')
      .where('user.id = :employerId', { employerId })
      .andWhere('user.role = :role', { role: UserRole.JOB_EMPLOYER })
      .groupBy('application.status')
      .getRawMany();

    const countstatus: Record<statusEnum, number> = Object.values(
      statusEnum,
    ).reduce(
      (acc, status) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<statusEnum, number>,
    );

    status.forEach((row) => {
      countstatus[row.status as statusEnum] = parseInt(row.count, 10);
    });

    // Convert the result to a Record<string, number>
    const counts: Record<string, number> = {};
    category.forEach((row) => {
      counts[row.category] = row.count;
    });

    const result = {
      status,
      category,
      message: 'received status and category counts',
    };

    return result;
  }
  async updateapplication(
    employer: UserTokenDto,
    updatApplicationDto: UpdateApplicationDto,
    applicationid: string,
  ) {
    const application = await this.entitymanager.findOne(Application, {
      where: {
        id: applicationid,
      },
      relations: ['job', 'job.user', 'user', 'job.user.profile'],
    });
    const applicant = application.user.id;
    if (application.job.user.id !== employer.id) {
      throw new UnauthorizedException('you are not authoized to update');
    }
    Object.assign(application, updatApplicationDto);

    // Save the updated application
    const updatedApplication =
      await this.applicationRepository.save(application);
    console.log(updatedApplication, 'from application service');
    const updateevent: UpdateEventDto = {
      clientid: applicant,
      message: `your application to ${application.job.job_role} has been updated`,
      name: `${application.job.user.name}`,
    };
    await this.eventsservice.emitApplicationUpdated(updateevent);
    return {
      application: plainToClass(ApplicationDto, updatedApplication),
      message: 'Successfully updated application',
    };
  }
}
