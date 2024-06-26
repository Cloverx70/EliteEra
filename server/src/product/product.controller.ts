import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Products } from 'src/entities/entities/Products';
import { Users } from 'src/entities/entities/Users';
import { adminGuard } from 'src/admin/guards/adminGuard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('get-all-products')
  async getAllProducts(): Promise<Products[]> {
    return await this.productService.getAllProducts();
  }

  @Post('get-product-by-id/:id')
  async getProductByProductId(@Param('id') id: number): Promise<Products> {
    return await this.productService.getProductByProductId(id);
  }

  @Post('add-product')
  async addProduct(@Body() req: Products): Promise<Products> {
    return await this.productService.addProduct(req);
  }
  @Post('remove-product-by-id/:id')
  async removeProductById(id: number): Promise<Products> {
    return await this.productService.removeProductById(id);
  }
}