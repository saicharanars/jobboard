import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/auth.gaurd';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
//   @UseGuards(AuthGuard)
//   @Put(':id')
//   update(
//     // @Body() updateUserDto: UpdateUserDto,
//     @Req() req: Request,
//     @Param('id', ParseUUIDPipe) id: string,
//   ) {
//     const user = req['user'];
//     console.log(id)
//     return this.usersService.update(user);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
