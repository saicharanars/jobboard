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

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}
  @UseGuards(AuthGuard)
  @Post(':id')
  @Roles('job_candidate')
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
  findAll(@Req() req: Request) {
    const user = req['user'];
    return this.applicationsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles('job_candidate')
  remove(@Req() req: Request, @Param('id', ParseUUIDPipe) id: string) {
    const user = req['user'];
    return this.applicationsService.remove(id, user);
  }
}
