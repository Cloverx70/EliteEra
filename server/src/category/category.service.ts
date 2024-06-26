import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/entities/Category';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dtos/CategoryCreate';
import { CategoryUpdateDto } from './dtos/CategoryUpdate';
import { Products } from 'src/entities/entities/Products';
import { Console } from 'console';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRpeo: Repository<Category>,
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async getCategoryProductsByCategoryName(
    categoryName: string,
  ): Promise<Products[]> {
    try {
      const CategoryProducts = await this.CategoryRpeo.findOne({
        where: { CategoryName: categoryName },
      });

      const productsIds = Object.values(CategoryProducts.CategoryProductsIds);
      let products = [];

      for (let i = 0; i < productsIds.length; i++) {
        const product = await this.productsRepo.findOne({
          where: { productId: productsIds[i] },
        });

        products.push(product);
      }

      if (CategoryProducts) {
        return products;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createCategory(categoryCreateDto: CategoryCreateDto) {
    try {
      const category = this.CategoryRpeo.create({
        CategoryId: Math.floor(Math.random() * 10000) + 1000,
        CategoryName: categoryCreateDto.CategoryName,
        CategoryProductsIds: {},
        CategoryItemsNumber: 0,
      });

      if (category) {
        await this.CategoryRpeo.save(category);
        return category;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateCategoryByName(categoryUpdateDto: CategoryUpdateDto) {
    try {
      const category = await this.CategoryRpeo.findOne({
        where: { CategoryName: categoryUpdateDto.CategoryName },
      });

      if (category) {
        const currentProductIds = category.CategoryProductsIds;

        const updatedProductIds = {
          ...currentProductIds,
          ...categoryUpdateDto.CategoryProductIds,
        };

        category.CategoryProductsIds = updatedProductIds;

        await this.CategoryRpeo.save(category);

        return category;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
