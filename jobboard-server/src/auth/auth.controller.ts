import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
