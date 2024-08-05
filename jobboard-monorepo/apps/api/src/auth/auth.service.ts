import axios from 'axios';

import {
  BadRequestException,
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
  getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }

  async handleGoogleAuth(code: string) {
    const { id_token, access_token } = await this.getGoogleTokens(code);
    const googleUser = await this.getGoogleUser(id_token, access_token);

    const existingUser = await this.entityManager.findOne(User, {
      where: { email: googleUser.email },
    });

    if (existingUser) {
      return this.signToken(existingUser);
    } else {
      return this.createGoogleUser(googleUser);
    }
  }
  private async signToken(user: User) {
    const payload = {
      id: user.id,
      username: user.name,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  private async createGoogleUser(googleUser: any) {
    const { email, name } = googleUser;
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newUser = this.entityManager.create(User, {
      email,
      name,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.entityManager.save(User, newUser);
      return {
        user: plainToClass(UserDto, savedUser),
        message: 'Google signup successful',
        access_token: (await this.signToken(savedUser)).access_token,
      };
    } catch (error) {
      if (error) {
        throw new BadRequestException('bad request');
      }
      throw error;
    }
  }

  private async getGoogleTokens(code: string) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    };

    try {
      const res = await axios.post(
        url,
        new URLSearchParams(values).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Failed to fetch Google Tokens', error.response.data);
      throw new BadRequestException('Failed to fetch Google Tokens');
    }
  }

  private async getGoogleUser(id_token: string, access_token: string) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Failed to fetch Google User', error.response.data);
      throw new BadRequestException('Failed to fetch Google User');
    }
  }
}
