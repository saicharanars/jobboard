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
  findAll(@Req() req: Request) {
    const user = req['user'];
    return this.applicationsService.findAll(user);
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
}
