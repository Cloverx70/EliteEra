import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { Products } from 'src/entities/entities/Products';
import { Variants } from 'src/entities/entities/Variant';
import { statistics } from 'src/entities/entities/statistics';

import { Repository } from 'typeorm';
import { addProductDto } from './Dtos/addPoduct.dto';
import { updateProductDto } from './Dtos/updateProduct.dto';

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

  async updateProductById(id: number, req: updateProductDto) {
    try {
      console.log(req);
      const product = await this.productRepo.findOne({
        where: { productId: id },
      });
      product.productTitle = req.title;
      product.productDescription = req.description;
      product.productPrice = req.productPrice;
      product.productStock = parseInt(req.stock);
      product.productOrigin = req.origin;
      product.productAbout = req.bgTitle;

      const variants = await this.VariantRepo.find({
        where: { productId: product.productId },
      });

      await this.VariantRepo.remove(variants);
      for (let i = 0; i < req.variants.length; i++) {
        const newVariant = this.VariantRepo.create({
          variantId: req.variants[i].variantId,
          productId: req.variants[i].prodid,
          VariantName: req.variants[i].variantName,
          VariantDetails: req.variants[i].variantDetails,
          VariantType: req.variants[i].variantType,
        });
        await this.VariantRepo.save(newVariant);
      }

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
