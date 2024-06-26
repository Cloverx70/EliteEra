import { Module } from '@nestjs/common';
import { BoughtTogetherService } from './bought-together.service';
import { BoughtTogetherController } from './bought-together.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { Products } from 'src/entities/entities/Products';

@Module({
  imports: [TypeOrmModule.forFeature([BtogetherProduct, Products])],
  providers: [BoughtTogetherService],
  controllers: [BoughtTogetherController],
})
export class BoughtToghetherModule {}
