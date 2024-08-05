import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
const frontendurl = 'https://jobboard-4vpn.vercel.app/';

@Controller('auth')
@ApiTags('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'bad request check your post body',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists ',
  })
  @Post('signup')
  async create(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'The login accepted.',
  })
  @ApiResponse({
    status: 400,
    description: 'bad request check your post body',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email doesnt exists ',
  })
  @ApiResponse({
    status: 406,
    description: 'Please check your password ',
  })
  async login(@Body(new ValidationPipe()) loginUser: LoginUserDto) {
    return this.authService.signin(loginUser);
  }

  @Get('google')
  @ApiOperation({ summary: 'Initiate Google OAuth2 Login' })
  @ApiResponse({ status: 302, description: 'Redirects to Google login page' })
  async googleAuth(@Res() res) {
    const url = this.authService.getGoogleAuthURL();
    return res.redirect(url);
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Handle Google OAuth2 callback' })
  @ApiResponse({
    status: 302,
    description: 'Redirects to frontend with token or error',
  })
  async googleAuthRedirect(@Query('code') code: string, @Res() res: Response) {
    try {
      const result = await this.authService.handleGoogleAuth(code);
      return res.redirect(
        `${frontendurl}auth/callback?token=${result.access_token}`,
      );
    } catch (err) {
      console.error('Google auth error:', err);
      return res.redirect(
        `${frontendurl}auth/callback?error=${encodeURIComponent(err.message)}`,
      );
    }
  }
}
