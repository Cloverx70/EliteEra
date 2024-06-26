import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { Products } from 'src/entities/entities/Products';
import { review } from 'src/entities/entities/review';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Products, review])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
