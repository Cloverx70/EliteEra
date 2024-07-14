import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { Products } from 'src/entities/entities/Products';
import { Repository } from 'typeorm';

@Injectable()
export class BoughtTogetherService {
  constructor(
    @InjectRepository(BtogetherProduct)
    private readonly BtogetherProductRepo: Repository<BtogetherProduct>,
    @InjectRepository(Products)
    private readonly ProductRepo: Repository<Products>,
  ) {}

  async updateBtogetherProds(BtogetherId: number, ProductIds: number[]) {
    try {
      const btogether = await this.BtogetherProductRepo.findOne({
        where: { boughtTogetheProductId: BtogetherId },
      });

      const ids: { [key: string]: number } = {};
      ProductIds.forEach((element) => {
        if (!ids[element]) {
          ids[element] = element;
        }
      });

      btogether.boughtTogetherProductIds = ids;
    } catch (error) {
      console.error(error);
    }
  }

  async getBtogetherProducts(BtogetherId: number) {
    try {
      const btogether = await this.BtogetherProductRepo.findOne({
        where: { boughtTogetheProductId: BtogetherId },
      });

      const products = [];
      const prodids = Object.values(btogether.boughtTogetherProductIds);

      for (let i = 0; i < prodids.length; i++) {
        const product = await this.ProductRepo.findOne({
          where: { productId: prodids[i] },
        });
        if (product) products.push(product);
      }
      console.log(products);

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
