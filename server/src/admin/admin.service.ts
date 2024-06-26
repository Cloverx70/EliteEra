import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/entities/admins';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminUserRepo: Repository<AdminEntity>,
  ) {}

  async getAdminUserByUserId(id: number) {
    try {
      const adminuser = await this.adminUserRepo.findOne({
        where: { userID: id },
      });

      return adminuser;
    } catch (error) {
      console.error(error);
    }
  }
}
