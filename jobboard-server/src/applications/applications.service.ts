import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UserTokenDto } from '../auth/dto/userTokenDto';
import { EntityManager, Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Application } from './entities/application.entity';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { ApplicationDto } from './dto/application.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { userApplicationsDto } from './dto/userapplication.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly entitymanager: EntityManager,
    private readonly jobsService: JobsService,
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

  async findAll(user: UserTokenDto) {
    console.log(user);

    const applications = await this.entitymanager.find(Application, {
      where: { user: { id: user.id } },
      relations: ['job'],
    });
    console.log(applications);
    return {
      applications: plainToInstance(userApplicationsDto, applications),
      message: 'sucessfuly retrieved applications',
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
}
