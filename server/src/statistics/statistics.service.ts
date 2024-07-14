import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; // Assuming you have a DTO defined
import { Injectable } from '@nestjs/common';
import { statistics } from 'src/entities/entities/statistics';
import { CreateStatDto } from './dtos/CreateStat.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(statistics)
    private readonly statRepo: Repository<statistics>,
  ) {}

  async createStatistics(createStatDto: CreateStatDto): Promise<statistics> {
    try {
      const latestStats = await this.statRepo.find({
        order: {
          statId: 'DESC',
        },
        take: 1,
      });

      const newStats = this.statRepo.create({
        statId: Math.floor(Math.random() * 1000000) + 1000,
        totalUsers:
          createStatDto.TotalUsers +
          (latestStats ? latestStats[0].totalUsers : 0),
        totalProducts:
          createStatDto.TotalProducts +
          (latestStats ? latestStats[0].totalProducts : 0),
        totalPurchases:
          createStatDto.TotalPurchases +
          (latestStats ? latestStats[0].totalPurchases : 0),
        totalEarnings:
          createStatDto.TotalEarnings +
          (latestStats ? latestStats[0].totalEarnings : 0),
        totalOrders:
          createStatDto.TotalOrders +
          (latestStats ? latestStats[0].totalOrders : 0),
      });

      await this.statRepo.save(newStats);

      return newStats;
    } catch (error) {
      console.error('Error creating statistics:', error);
      throw new Error('Failed to create statistics');
    }
  }

  async getAllStats(): Promise<statistics[]> {
    try {
      const stats: statistics[] = await this.statRepo.find();
      return stats;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw new Error('Failed to fetch statistics');
    }
  }

  async getLatestStats() {
    try {
      const latestStats = await this.statRepo.find({
        order: {
          statId: 'DESC',
        },
        take: 1,
      });
      return latestStats;
    } catch (error) {
      console.error('Error fetching latest statistics:', error);
      throw new Error('Failed to fetch latest statistics');
    }
  }
}
