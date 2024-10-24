import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { Products } from 'src/entities/entities/Products';
import { Repository } from 'typeorm';
import { In } from 'typeorm';

@Injectable()
export class BoughtTogetherService {
  constructor(
    @InjectRepository(BtogetherProduct)
    private readonly BtogetherProductRepo: Repository<BtogetherProduct>,
    @InjectRepository(Products)
    private readonly ProductRepo: Repository<Products>,
  ) {}
  async updateBtogetherProds(ProdId: number, ProductIds: number[]) {
    try {
      const btogether = await this.BtogetherProductRepo.findOne({
        where: { productId: ProdId },
      });

      if (!btogether) {
        throw new Error(`No record found for Prodis ${ProdId}`);
      }

      const ProductIdsArray = Object.values(btogether.boughtTogetherProductIds);
      for (let i = 0; i < ProductIds.length; i++) {
        if (
          Object.values(btogether.boughtTogetherProductIds).includes(
            ProductIds[i],
          )
        ) {
          return;
        } else {
          ProductIdsArray.push(ProductIds[i]);
        }
      }

      btogether.boughtTogetherProductIds = ProductIds;

      await this.BtogetherProductRepo.save(btogether);

      return btogether;
    } catch (error) {
      console.log(error);
    }
  }
  async getBtogetherProducts(btogetherId: number) {
    try {
      console.log(btogetherId);
      const btogether = await this.BtogetherProductRepo.findOne({
        where: { boughtTogetheProductId: btogetherId },
      });

      if (!btogether) {
        throw new Error(
          `No record found for boughtTogetheProductId ${btogetherId}`,
        );
      }

      // Flatten the array if needed
      const prodids = [].concat(
        ...Object.values(btogether.boughtTogetherProductIds),
      );

      // Use Promise.all with map to fetch products
      const products = await Promise.all(
        prodids.map(async (id) => {
          return await this.ProductRepo.findOne({
            where: { productId: id },
          });
        }),
      );

      console.log(products);

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
