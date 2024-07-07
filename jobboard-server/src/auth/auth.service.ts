import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login.dto';
import { User } from '../users/entities/user.entity';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { password, email, ...rest } = createUserDto;
    const checkUser = await this.entityManager.existsBy(User, { email: email });
    if (checkUser) {
      throw new ConflictException('User with this email already exists');
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      const user = { ...rest, email, password: hashedpassword };

      const userResult = await this.entityManager.save(User, user);
      console.log(user, '>>>>>');
      return {
        user: plainToClass(UserDto, userResult),
        message: 'signup succesfull',
      };
    }
  }
  async signin(loginUser: LoginUserDto) {
    console.log(loginUser);
    const { email, password } = loginUser;
    const checkUser = await this.entityManager.findOneBy(User, {
      email: email,
    });
    if (!checkUser) {
      throw new ConflictException(
        'User with this email doesnot exists please signup',
      );
    } else {
      console.log(checkUser);
      const comparepasword = await bcrypt.compare(password, checkUser.password);
      console.log(comparepasword);
      if (comparepasword == true) {
        const payload = {
          id: checkUser.id,
          username: checkUser.name,
          role: checkUser.role,
        };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new NotAcceptableException('Please check your password');
      }
    }

    return;
  }
}
