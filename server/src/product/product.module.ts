import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/entities/Products';
import { Variants } from 'src/entities/entities/Variant';
import { productvariants } from 'src/entities/entities/productVariants';
import { statistics } from 'src/entities/entities/statistics';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Variants, productvariants, statistics]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
