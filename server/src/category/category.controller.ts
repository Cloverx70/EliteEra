import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dtos/CategoryCreate';
import { retry } from 'rxjs';
import { CategoryUpdateDto } from './dtos/CategoryUpdate';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { adminGuard } from 'src/admin/guards/adminGuard';

@UseGuards(jwtguard, adminGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post('get-category-products-by-category-name/:name')
  async getCategoryProductsByCategoryName(@Param('name') categoryName: string) {
    return await this.CategoryService.getCategoryProductsByCategoryName(
      categoryName,
    );
  }

  @Post('create-category')
  async createCategory(@Body() createCategoryDto: CategoryCreateDto) {
    return await this.CategoryService.createCategory(createCategoryDto);
  }
  @Post('update-category-by-name')
  async updateCategory(@Body() updateCategoryDto: CategoryUpdateDto) {
    return await this.CategoryService.updateCategoryByName(updateCategoryDto);
  }
}
