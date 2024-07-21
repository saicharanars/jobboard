import { UserDto } from '../../users/dto/user.dto';
import { Profile } from '../entities/profile.entity';

export class profileDto extends UserDto {
  profile: Profile;
}
