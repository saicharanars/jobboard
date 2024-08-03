import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UserTokenDto } from '../auth/dto/userTokenDto';
import { EntityManager } from 'typeorm';
import { Job } from './entities/job.entity';
import { plainToClass } from 'class-transformer';
import { JobDto } from './dto/job.dto';
import { User } from '../users/entities/user.entity';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class JobsService {
  constructor(private readonly entitymanager: EntityManager) {}
  async create(_createJobDto: CreateJobDto, user: UserTokenDto) {
    const userEntity = await this.entitymanager.findOne(User, {
      where: { id: user.id },
    });

    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    const newJob = await this.entitymanager.create(Job, _createJobDto);
    newJob.user = userEntity;
    const savejob = await this.entitymanager.save(Job, newJob);

    return {
      job: plainToClass(JobDto, savejob),
      message: 'Successfully added job',
    };
  }

  async findAll(_user: UserTokenDto) {
    const employer_jobs = await this.entitymanager.findOne(User, {
      where: {
        id: _user.id,
      },
      relations: ['jobs'],
    });

    const { jobs } = employer_jobs;
    if (jobs.length < 1) {
      return new NotFoundException('no jobs found with this employer');
    }
    return {
      job: jobs,
      message: 'This action returns all jobs by employer',
    };
  }

  async findOne(jobid: string) {
    const job = await this.entitymanager.findOne(Job, {
      where: {
        id: jobid,
      },
      
    });
    if (!job) {
      throw new NotFoundException('Job with this id is not found');
    }
    return {
      job: plainToClass(JobDto, job),
      message: 'Successfully retrived job',
    };
  }

  async update(jobid: string, updateJobDto: UpdateJobDto, _user: UserTokenDto) {
    const job = await this.entitymanager.findOne(Job, {
      where: {
        id: jobid,
      },
      relations: ['user'],
    });

    if (!job) {
      throw new NotFoundException(`Job not found with this id  ${jobid}`);
    }

    if (job.user.id != _user.id) {
      throw new BadRequestException(
        'you are not owner of job, only emplyer of job can update jobs',
      );
    }
    const updatedjob = await this.entitymanager.update(
      Job,
      jobid,
      updateJobDto,
    );

    return {
      job: plainToClass(JobDto, updatedjob),
      message: 'Successfully updated job',
    };
  }

  async remove(jobid: string, _user: UserTokenDto) {
    const job = await this.entitymanager.findOne(Job, {
      where: {
        id: jobid,
      },
      relations: ['user'],
    });
    if (!job) {
      throw new NotFoundException(`Job not found with this id  ${jobid}`);
    }
    console.log(job);
    if (job.user.id != _user.id) {
      throw new BadRequestException(
        'you are not owner of job, only employer of job can delete jobs',
      );
    }
    const deleted = await this.entitymanager.remove(job);
    console.log(deleted);
    return {
      job: plainToClass(JobDto, deleted),
      message: 'Successfully deleted job',
    };
  }

  async alljobs(params: FilterDto) {
    console.log(params);
    const queryBuilder = this.entitymanager.createQueryBuilder(Job, 'job');

    if (params.sort) {
      queryBuilder.orderBy('job.createdDate', params.sort);
    } else {
      queryBuilder.orderBy('job.createdDate', 'DESC'); // Default sort
    }
    if (params.category) {
      queryBuilder.andWhere('job.category = :category', {
        category: params.category,
      });
    }

    if (params.location) {
      queryBuilder.andWhere('job.location = :location', {
        location: params.location,
      });
    }

    const jobs = await queryBuilder.getMany();
    return jobs;
  }
  
}
