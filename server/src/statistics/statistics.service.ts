import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { statistics } from 'src/entities/entities/statistics';
import { Repository } from 'typeorm';
import { userDto } from './dtos/user.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(statistics)
    private readonly StatRepo: Repository<statistics>,
  ) {}

  async getStatistics(user: userDto) {
    try {
      const stats = await this.StatRepo.findOne({ where: { statId: 456456 } });
      if (stats) return stats;
    } catch (error) {
      console.error(error);
    }
  }
}
