import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserTokenDto } from '../auth/dto/userTokenDto';
import { EntityManager, QueryBuilder } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class ProfilesService {
  constructor(private readonly entitymanager: EntityManager) {}
  async create(createProfileDto: CreateProfileDto, usertoken: UserTokenDto) {
    const user = await this.entitymanager.findOne(User, {
      where: { id: usertoken.id },
      relations: ['profile'],
    });
    if (user.profile) {
      return this.update(user.id, createProfileDto);
    }
    const profile = this.entitymanager.create(Profile, createProfileDto);
    user.profile = profile;

    await this.entitymanager.save(User, user);
    return {
      profile: plainToClass(CreateProfileDto, profile),
      message: 'Successfully added Profile',
    };
  }

  async findAll() {
    const profiles = await this.entitymanager.find(Profile);
    return profiles;
  }

  async findOne(id: string) {
    const profile = await this.entitymanager.findOne(Profile, {
      where: { id: id },
      relations: ['user'], // Include this if you want to fetch job details with each application
    });
    if (!profile) {
      throw new NotFoundException('no profile found');
    }
    return {
      profile: plainToInstance(CreateProfileDto, profile),
      message: 'Successfully updated Profile',
    };
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    console.log(updateProfileDto, id, 'update on service');

    const user = await this.entitymanager.findOne(User, {
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedProfile = await this.entitymanager.update(
      Profile,
      user.profile.id,
      updateProfileDto,
    );

    const profile = await this.entitymanager.findOne(Profile, {
      where: { id: user.profile.id },
    });

    console.log(user, updatedProfile);
    return {
      profile: plainToInstance(UpdateProfileDto, profile),
      message: 'Successfully updated Profile',
    };
  }

  async remove(profileId: string, usertoken: UserTokenDto) {
    const user = await this.entitymanager.findOne(User, {
      where: { id: usertoken.id },
      relations: ['profile'],
    });

    if (!user || !user.profile) {
      throw new NotFoundException('User or profile not found');
    }

    if (user.profile.id !== profileId) {
      throw new BadRequestException("Profile ID does not match user's profile");
    }

    user.profile = null;
    await this.entitymanager.save(User, user);
    const profiledeleted = await this.entitymanager.delete(Profile, {
      id: profileId,
    });
    return {
      profile: profiledeleted,
      message: 'Successfully deleted Profile',
    };
  }
}
