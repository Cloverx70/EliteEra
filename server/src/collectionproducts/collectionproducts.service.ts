import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collectionproducts } from 'src/entities/entities/Collectionproducts';
import { Repository } from 'typeorm';
import { addcollectionproduct } from './dtos/addcolelctionproduct.dto';
import { Products } from 'src/entities/entities/Products';

@Injectable()
export class CollectionproductsService {
  constructor(
    @InjectRepository(Collectionproducts)
    private readonly collectionProductsRepo: Repository<Collectionproducts>,
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async getProductsByCollectionId(id: number) {
    try {
      return await this.productsRepo.find({
        where: { collectionId: id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCollectionByProductIdAndCollectionId(
    req: addcollectionproduct,
  ) {
    try {
      const CollectionProduct = this.collectionProductsRepo.create({
        collectionProductId: Math.floor(Math.random() * 10000) + 1000,
        collectionId: req.CID,
        productId: req.PID,
      });

      await this.collectionProductsRepo.save(CollectionProduct);
      return CollectionProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async removeProductCollectionByCollectionProudctId(id: number) {
    try {
      const collectionProduct = await this.collectionProductsRepo.findOne({
        where: { collectionProductId: id },
      });
      return await this.collectionProductsRepo.remove(collectionProduct);
    } catch (error) {
      console.error(error);
    }
  }
}
