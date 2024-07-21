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
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import 'multer';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import {
  fileType,
  UpdateProfileDto,
  uploadType,
} from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ParseFilePipeBuilder } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'succesfully retrived profiles.',
  })
  findAll() {
    return this.profilesService.findAll();
  }
  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'succesfully retrived profile.',
  })
  @ApiHeader({
    name: 'Authorization',
    description:
      'authorization token like this eyJhbGciOWoidWhkdRpZGF0ZSIsImlhdCI6MTcyMDc2MTQzMCwiZXhwIjoxNzIwODQ3ODMwfQ.jGXo5HhlUZfD_R7wQXJKTanY-rCe4jYGg_hXTmpS71s',
  })
  userprofile(@Req() req: Request) {
    const user = req['user'];
    console.log('User :', user);
    return this.profilesService.userprofile(user);
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

  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file (profile picture or resume)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload',
        },
        type: {
          type: 'string',
          enum: ['profile_picture_url', 'resume_url'],
          description: 'Type of file being uploaded',
        },
      },
    },
  })
  @ApiSecurity('JWT-auth')
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check your post body.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized access.' })
  @ApiResponse({ status: 404, description: 'User or profile not found.' })
  @ApiResponse({
    status: 422,
    description: 'Unprocessable Entity. File validation failed.',
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10000000,
        })
        .addFileTypeValidator({
          fileType: /^(application\/pdf|image\/jpeg|image\/jpg|image\/png)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
    @Body() type: uploadType,
  ) {
    const user = req['user'];
    console.log(type);
    console.log('User uploading file:', user);
    return this.profilesService.saveFile(file, user, type);
  }
}
