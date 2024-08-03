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
import { ApiBody, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('jobs')
@ApiTags('jobs')

export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(AuthGuard)
  @Post()
  @Roles('job_employer')
  @ApiBody({ type: CreateJobDto })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request check your request body.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to access that resource.',
  })
  @ApiResponse({
    status: 403,
    description:
      'forbidden. conflicting roles either you are trying to access resources of job employer as jobseeker or jobseeker trying to access resource of job employer .',
  })
  create(@Req() req: Request, @Body() createJobDto: CreateJobDto) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user);
    return this.jobsService.create(createJobDto, user);
  }
  @UseGuards(AuthGuard)
  @Get('company')
  @Roles('job_employer')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token for authorization and user role should be employer like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrived.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to access that resource.',
  })
  @ApiResponse({
    status: 403,
    description:
      'forbidden. conflicting roles either you are trying to access resources of job employer as jobseeker or jobseeker trying to access resource of job employer .',
  })
  findAll(@Req() req: Request) {
    const user = req['user'];
    console.log('User requesting all jobs:', user);
    return this.jobsService.findAll(user);
  }
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrived.',
  })
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getalljobs(@Query() filterDto: FilterDto) {
    console.log(filterDto);
    return this.jobsService.alljobs(filterDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrived.',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.jobsService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  @Roles('job_employer')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'uuid of job',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to access that resource.',
  })
  @ApiResponse({
    status: 403,
    description:
      'forbidden. conflicting roles either you are trying to access resources of job employer as jobseeker or jobseeker trying to access resource of job employer .',
  })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully updated.',
  })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token for authorization and user role should be employer like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
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
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'uuid of job',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized to access that resource.',
  })
  @ApiResponse({
    status: 403,
    description:
      'forbidden. conflicting roles either you are trying to access resources of job employer as jobseeker or jobseeker trying to access resource of job employer .',
  })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully deleted.',
  })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token for authorization and user role should be employer like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: Request) {
    const user = req['user'];
    return this.jobsService.remove(id, user);
  }
}
