import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signin } from './dtos/signin.dto';
import { localGuard } from './guards/localguard';
import { signup } from './dtos/signup.dto';
import { Request } from 'express';
import { jwtguard } from './guards/JWTguard';
import { Users } from 'src/entities/entities/Users';
import { updateUserAuthDto } from './dtos/updateUser.dto';

@Controller('auth')
export class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(localGuard)
  async login(@Body() req: signin) {
    return await this.authService.validate(req);
  }

  @Post('signup')
  async signup(@Body() req: signup) {
    return await this.authService.signup(req);
  }

  @Get('status')
  @UseGuards(jwtguard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('get-user-by-id/:id')
  async getUserById(@Param('id') id: number) {
    return await this.authService.getUserById(id);
  }

  @Post('update-user-by-id/:id')
  async updateUserById(
    @Param('id') id: number,
    @Body() req: updateUserAuthDto,
  ) {
    return await this.authService.UpdateUserById(id, req);
  }
}
