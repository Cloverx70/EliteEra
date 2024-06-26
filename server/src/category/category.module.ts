import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/entities/Category';
import { Products } from 'src/entities/entities/Products';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Products])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
