import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/entities/Products';
import { Variants } from 'src/entities/entities/Variant';
import { productvariants } from 'src/entities/entities/productVariants';
import { statistics } from 'src/entities/entities/statistics';

import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
    @InjectRepository(productvariants)
    private readonly productVariantRepo: Repository<productvariants>,
    @InjectRepository(Variants)
    private readonly VariantRepo: Repository<Variants>,
    @InjectRepository(statistics)
    private readonly statRepo: Repository<statistics>,
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

  async addProduct(req: Products) {
    try {
      const product = this.productRepo.create({
        productId: Math.floor(Math.random() * 10000) + 1000,
        productPicture: req.productPicture,
        productTitle: req.productTitle,
        productDescription: req.productDescription,
        productPrice: req.productPrice,
        productStock: req.productStock,
        productRating: req.productRating,
        productOrigin: req.productOrigin,
        productSeason: req.productSeason,
        productAbout: req.productAbout,
      });

      const variant = this.VariantRepo.create({
        variantId: Math.floor(Math.random() * 100000) + 1000,
        productId: product.productId,
      });

      const productVariant = this.productVariantRepo.create({
        variantId: variant.variantId,
      });

      const stat = await this.statRepo.findOne({ where: { statId: 456456 } });

      stat.totalProducts += 1;

      await this.statRepo.save(stat);
      await this.productRepo.save(product);
      await this.productVariantRepo.save(productVariant);
      await this.VariantRepo.save(variant);

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
