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
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiBody({ type: CreateProfileDto })
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
    description: 'bad request check your post body',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access ',
  })
  create(@Body() createProfileDto: CreateProfileDto, @Req() req: Request) {
    const user = req['user']; // This is where the user information is stored by AuthGuard
    console.log('User creating job:', user);
    return this.profilesService.create(createProfileDto, user);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'succesfully retrived profiles.',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'succesfully retrived profile.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found profile.',
  })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch()
  @ApiBody({ type: UpdateProfileDto })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'bad request check your post body',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access ',
  })
  @ApiResponse({
    status: 404,
    description: 'not found user or profile ',
  })
  update(@Body() updateProfileDto: UpdateProfileDto, @Req() req: Request) {
    const user = req['user'];
    console.log('User creating job:', user);
    return this.profilesService.update(user.id, updateProfileDto);
  }
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
    description: 'no user or profile found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access ',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) profileid: string,
  ) {
    const user = req['user'];
    console.log('User creating job:', user);
    return this.profilesService.remove(profileid, user);
  }
}
