import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UserTokenDto } from '../auth/dto/userTokenDto';
import { EntityManager } from 'typeorm';
import { Job } from './entities/job.entity';
import { plainToClass } from 'class-transformer';
import { JobDto } from './dto/job.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JobsService {
  constructor(private readonly entitymanager: EntityManager) {}
  async create(_createJobDto: CreateJobDto, user: UserTokenDto) {
    console.log(_createJobDto, user);

    if (user.role === 'job_candidate') {
      throw new UnauthorizedException('You are not allowed to add jobs');
    }

    const result = await this.entitymanager.transaction(
      async (transactionEntityManager) => {
        // Fetch the user entity
        const userEntity = await transactionEntityManager.findOne(User, {
          where: { id: user.id },
          relations: ['jobs'],
        });

        // Check if user entity was found
        if (!userEntity) {
          throw new BadRequestException('User not found');
        }

        // Create a new job associated with the user
        const newJob = transactionEntityManager.create(Job, {
          ..._createJobDto,
          user: userEntity,
        });

        // Save the new job
        const savedJob = await transactionEntityManager.save(Job, newJob);

        // Add the new job to the user's jobs and save the user entity
        userEntity.jobs.push(savedJob);
        await transactionEntityManager.save(User, userEntity);

        return savedJob;
      },
    );

    return {
      job: plainToClass(JobDto, result),
      message: 'Successfully added job',
    };
  }

  async findAll(_user: UserTokenDto) {
    console.log(_user);
    if (_user.role == 'job_candidate') {
      throw new UnauthorizedException('you are not allowed to view jobs');
    }
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
    console.log(updateJobDto, _user);
    if (_user.role == 'job_candidate') {
      throw new UnauthorizedException(
        'you are not an employer,you are not allowed to update jobs',
      );
    }
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

    console.log(updatedjob, '<<<<<<<');

    return {
      job: plainToClass(JobDto, updatedjob),
      message: 'Successfully updated job',
    };
  }

  async remove(jobid: string, _user: UserTokenDto) {
    if (_user.role == 'job_candidate') {
      throw new UnauthorizedException('you are not allowed to delete jobs');
    }
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
        'you are not owner of job, only emplyer of job can delete jobs',
      );
    }
    const deleted = await this.entitymanager.delete(Job, job);
    return {
      job: plainToClass(JobDto, deleted),
      message: 'Successfully deleted job',
    };
  }
}
