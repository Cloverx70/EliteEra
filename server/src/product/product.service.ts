import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { Products } from 'src/entities/entities/Products';
import { Variants } from 'src/entities/entities/Variant';
import { statistics } from 'src/entities/entities/statistics';

import { Repository } from 'typeorm';
import { addProductDto } from './Dtos/addPoduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
    @InjectRepository(Variants)
    private readonly VariantRepo: Repository<Variants>,
    @InjectRepository(statistics)
    private readonly statRepo: Repository<statistics>,
    @InjectRepository(BtogetherProduct)
    private readonly btogetherRepo: Repository<BtogetherProduct>,
  ) {}

  async getAllProducts() {
    try {
      return await this.productRepo.find();
    } catch (error) {
      console.error(error);
    }
  }

  async getProductByProductId(id: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { productId: id },
      });

      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async addProduct(req: addProductDto) {
    try {
      const product = this.productRepo.create({
        productId: Math.floor(Math.random() * 10000) + 1000,
        productPicture: req.productPicture,
        productTitle: req.productName,
        productDescription: req.productDescription,
        productPrice: req.productPrice,
        productStock: req.productStock,
        productRating: req.productRating,
        productOrigin: req.productOrigin,
        productSeason: req.productSeason,
        productAbout: req.productAbout,
      });

      const BoughtTogetherProds = this.btogetherRepo.create({
        boughtTogetheProductId: Math.floor(Math.random() * 10000) + 1000,
        productId: product.productId,
        boughtTogetherProductIds: [],
      });

      product.btoghetherId = BoughtTogetherProds.boughtTogetheProductId;

      await this.btogetherRepo.save(BoughtTogetherProds);
      await this.productRepo.save(product);

      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async removeProductById(id: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { productId: id },
      });
      await this.productRepo.remove(product);
      return product;
    } catch (error) {
      console.error(error);
    }
  }
}
