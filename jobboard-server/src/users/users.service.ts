import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // Correctly import bcrypt
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const { password, email, ...rest } = createUserDto;
    const checkUser = await this.entityManager.existsBy(User, { email: email });
    if (checkUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = { ...rest, email, password: hashedpassword };

    // const userResult = await this.entityManager.save(User, user);
    return plainToClass(UserDto, user);
  }

  async login(loginUser: LoginUserDto) {
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
      const payload = {
        id: checkUser.id,
        username: checkUser.name,
        role: 'job_candiatate',
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
