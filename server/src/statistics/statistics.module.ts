import { Module, forwardRef } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { statistics } from 'src/entities/entities/statistics';
import { CheckoutuserproductsModule } from 'src/checkoutuserproducts/checkoutuserproducts.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [
    TypeOrmModule.forFeature([statistics]),
    forwardRef(() => CheckoutuserproductsModule),
  ],
  exports: [StatisticsService],
})
export class StatisticsModule {}
