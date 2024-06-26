import { Controller, Post, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { adminGuard } from 'src/admin/guards/adminGuard';
import { userDto } from './dtos/user.dto';
import { jwtguard } from 'src/auth/guards/JWTguard';

@UseGuards(adminGuard, jwtguard)
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('get-stats')
  async getStats(user: userDto) {
    return await this.statisticsService.getStatistics(user);
  }
}
