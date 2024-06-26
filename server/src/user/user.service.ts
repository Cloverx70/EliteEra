import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDto } from './dtos/UpdateUser.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/entities/Users';
import { updateUserCartDto } from './dtos/UpdateUserCart.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    try {
      const users: Users[] = await this.userRepo.find();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(id: number): Promise<Users> {
    try {
      const user = await this.userRepo.findOne({ where: { userId: id } });
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async removeUserById(id: number): Promise<Users> {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    await this.userRepo.remove(user);
    return user;
  }

  async updateUserById(id: number, req: updateUserDto) {
    try {
      const user = await this.userRepo.findOne({ where: { userId: id } });
      user.username = req.username;
      user.fullname = req.fullName;
      user.email = req.email;
      user.passwordhash = await bcrypt.hash(req.password, 10);
      user.addressOne = req.addressone;
      user.addressTwo = req.addresstwo;

      await this.userRepo.save(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
