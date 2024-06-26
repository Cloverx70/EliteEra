import { Module } from '@nestjs/common';
import { CollectionproductsController } from './collectionproducts.controller';
import { CollectionproductsService } from './collectionproducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collectionproducts } from 'src/entities/entities/Collectionproducts';
import { Products } from 'src/entities/entities/Products';

@Module({
  imports: [TypeOrmModule.forFeature([Collectionproducts, Products])],
  controllers: [CollectionproductsController],
  providers: [CollectionproductsService],
})
export class CollectionproductsModule {}
