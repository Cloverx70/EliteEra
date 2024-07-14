import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/entities/Products';
import { Variants } from 'src/entities/entities/Variant';

import { statistics } from 'src/entities/entities/statistics';
import { BtogetherProduct } from 'src/entities/entities/Btogether';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      Variants,

      statistics,
      BtogetherProduct,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
