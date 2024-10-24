import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Products } from 'src/entities/entities/Products';
import { Users } from 'src/entities/entities/Users';
import { adminGuard } from 'src/admin/guards/adminGuard';
import { addProductDto } from './Dtos/addPoduct.dto';
import { updateProductDto } from './Dtos/updateProduct.dto';

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

  @Post('update-product-by-id/:id')
  async updateProductById(
    @Param('id') id: number,
    @Body() req: updateProductDto,
  ) {
    return await this.productService.updateProductById(id, req);
  }
  @Post('add-product')
  async addProduct(@Body() req: addProductDto): Promise<Products> {
    return await this.productService.addProduct(req);
  }
  @Post('remove-product-by-id/:id')
  async removeProductById(id: number): Promise<Products> {
    return await this.productService.removeProductById(id);
  }
}
