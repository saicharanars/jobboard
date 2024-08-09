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
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { AuthGuard, Roles } from '../auth/auth.gaurd';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
@ApiTags('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}
  @UseGuards(AuthGuard)
  @Post(':id')
  @Roles('job_candidate')
  @ApiBody({ type: CreateApplicationDto })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'uuid of job',
  })
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
    description: 'bad request check your post body or params',
  })
  @ApiResponse({
    status: 406,
    description: 'not acceptable you already applied for this job ',
  })
  create(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user, createApplicationDto, id);
    return this.applicationsService.create(createApplicationDto, user, id);
  }
  @UseGuards(AuthGuard)
  @Get('user')
  @Roles('job_candidate')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully received.',
  })
  findAll(
    @Req() req: Request,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const user = req['user'];
    const skipNumber = skip ? parseInt(skip, 10) : undefined;
    const takeNumber = take ? parseInt(take, 10) : undefined;
    return this.applicationsService.findAll(user, skipNumber, takeNumber);
  }
  @UseGuards(AuthGuard)
  @Get('employer')
  // @Roles('job_employer')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully received.',
  })
  findAllapplicants(@Req() req: Request) {
    const user = req['user'];
    console.log(user);
    return this.applicationsService.findAllApplicants(user);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'uuid of job',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'bad request check your params',
  })
  @ApiResponse({
    status: 404,
    description: 'not found job',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles('job_candidate')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'string',
    description: 'uuid of job',
  })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'bad request check your post body or params',
  })
  @ApiResponse({
    status: 404,
    description: 'not found application ',
  })
  remove(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const user = req['user'];
    return this.applicationsService.remove(id, user);
  }

  @UseGuards(AuthGuard)
  @Get('user/count/applicant')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully received.',
  })
  countapplications(@Req() req: Request) {
    const user = req['user'];
    return this.applicationsService.countPending(user);
  }
  @UseGuards(AuthGuard)
  @Get('user/count/employer')
  @Roles('job_employer')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully received.',
  })
  countapplicationsCategory(@Req() req: Request) {
    const user = req['user'];
    return this.applicationsService.countApplicationsByCategory(user.id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @Roles('job_employer')
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully received.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatApplicationDto: UpdateApplicationDto,
  ) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user, updatApplicationDto, id);
    return this.applicationsService.updateapplication(
      user,
      updatApplicationDto,
      id,
    );
  }
}
