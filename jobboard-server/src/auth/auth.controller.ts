import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUser: LoginUserDto) {
    return this.authService.signin(loginUser);
  }
}
