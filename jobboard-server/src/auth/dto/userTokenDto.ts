import { IsUUID, IsString, IsEnum, IsNumber } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class UserTokenDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
