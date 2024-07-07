import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { JobDto } from './dto/job.dto';
// import { UserTokenDto } from '../auth/dto/userTokenDto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createJobDto: CreateJobDto) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user);
    return this.jobsService.create(createJobDto, user);
  }
  @UseGuards(AuthGuard)
  @Get('company')
  findAll(@Req() req: Request) {
    const user = req['user'];
    console.log('User requesting all jobs:', user);
    return this.jobsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.jobsService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.jobsService.update(id, updateJobDto, user);
  }
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: Request) {
    const user = req['user'];
    return this.jobsService.remove(id,user);
  }
}
