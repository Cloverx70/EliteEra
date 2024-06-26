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

  async getAllBTogetherProductsByProductId(productId: number) {
    try {
      const BtogetherProducts = await this.BtogetherProductRepo.find({
        where: { productId: productId },
      });

      if (BtogetherProducts) return BtogetherProducts;
      else return null;
    } catch (error) {
      console.error(error);
    }
  }

  async addBTogetherProductByProductId(productid: number) {
    try {
      if (await this.ProductRepo.findOne({ where: { productId: productid } })) {
        const BtogetherProduct = this.BtogetherProductRepo.create({
          boughtTogetheProductId: Math.floor(Math.random() * 100303) + 103000,
          productId: productid,
        });

        await this.BtogetherProductRepo.save(BtogetherProduct);

        return BtogetherProduct;
      } else return null;
    } catch (error) {
      console.error(error);
    }
  }

  async removeBTogetherProducByProductIdAndBtogetherId(
    prodId: number,
    btogetherId: number,
  ) {
    try {
      const BtogetherProd = await this.BtogetherProductRepo.findOne({
        where: { boughtTogetheProductId: btogetherId, productId: prodId },
      });

      await this.BtogetherProductRepo.remove(BtogetherProd);

      if (BtogetherProd) return BtogetherProd;
      else return null;
    } catch (error) {
      console.error;
    }
  }

  async updateBTogetherProductByProductIdAndBtogetherId(
    prodid: number,
    btogetherId: number,
    newprodid: number,
  ) {
    try {
      const btogetherprod = await this.BtogetherProductRepo.findOne({
        where: { productId: prodid, boughtTogetheProductId: btogetherId },
      });

      btogetherprod.productId = newprodid;
    } catch (error) {
      console.error(error);
    }
  }
}
