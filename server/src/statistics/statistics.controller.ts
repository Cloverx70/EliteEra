import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { adminGuard } from 'src/admin/guards/adminGuard';
import { userDto } from './dtos/user.dto';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { CreateStatDto } from './dtos/CreateStat.dto';

@UseGuards(adminGuard, jwtguard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('get-all-stats')
  async getStats() {
    return await this.statisticsService.getAllStats();
  }

  @Post('create-stats')
  async createStats(@Body() CreateStat: CreateStatDto) {
    return await this.statisticsService.createStatistics(CreateStat);
  }

  @Post('get-latest-stats')
  async getLatestStats() {
    return await this.statisticsService.getLatestStats();
  }
}
