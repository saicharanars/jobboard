import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Put,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard, Roles } from '../auth/auth.gaurd';
import { FilterDto } from './dto/filter.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(AuthGuard)
  @Post()
  @Roles('job_employer')
  create(@Req() req: Request, @Body() createJobDto: CreateJobDto) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user);
    return this.jobsService.create(createJobDto, user);
  }
  @UseGuards(AuthGuard)
  @Get('company')
  @Roles('job_employer')
  findAll(@Req() req: Request) {
    const user = req['user'];
    console.log('User requesting all jobs:', user);
    return this.jobsService.findAll(user);
  }
  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getalljobs(@Query() filterDto: FilterDto) {
    console.log(filterDto);
    return this.jobsService.alljobs(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.jobsService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  @Roles('job_employer')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.jobsService.update(id, updateJobDto, user);
  }
  @UseGuards(AuthGuard)
  @Roles('job_employer')
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: Request) {
    const user = req['user'];
    return this.jobsService.remove(id, user);
  }
}
