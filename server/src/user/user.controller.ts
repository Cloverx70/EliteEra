import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDto } from './dtos/UpdateUser.dto';
import { Users } from 'src/entities/entities/Users';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { updateUserCartDto } from './dtos/UpdateUserCart.dto';

@UseGuards(jwtguard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('get-all-users')
  async getAllUsers(): Promise<Users[]> {
    return await this.userService.getAllUsers();
  }

  @Post('get-user-by-id/:id')
  async getUserById(id: number): Promise<Users> {
    return await this.userService.getUserById(id);
  }

  @Post('remove-user-by-id/:id')
  async removeUserById(id: number) {
    return await this.userService.removeUserById(id);
  }

  @Post('update-user-by-id/:id')
  async updateUserById(id: number, @Body() req: updateUserDto) {
    return await this.userService.updateUserById(id, req);
  }
}
