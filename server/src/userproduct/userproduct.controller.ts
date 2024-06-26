import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { addUserProductdto } from './dtos/adduserproduct.dto';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { rmeoveUserProductDto } from './dtos/removeUserProduct.dto';
import { updateUserProductDto } from './dtos/updateUser.dto';
import { getUserProductDto } from './dtos/getuserProduct.dto';

@UseGuards(jwtguard)
@Controller('userproduct')
export class UserproductController {
  constructor(private readonly userProductService: UserproductService) {}

  @Get('get-all-user-products/:id')
  async getAllUserProducts(@Param('id') id: number): Promise<Userproducts[]> {
    return await this.userProductService.getUserProductsByUserId(id);
  }

  @Post('get-user-product-by-id/:id')
  async getUserProductByUserProductId(id: number): Promise<Userproducts> {
    return await this.userProductService.getUserProductByUserProductId(id);
  }

  @Post('add-user-product')
  async addUserProduct(@Body() req: addUserProductdto): Promise<Userproducts> {
    return await this.userProductService.addUserProduct(req);
  }

  @Post('remove-user-product-by-id')
  async removeUserProductById(
    @Body() rmdto: rmeoveUserProductDto,
  ): Promise<Userproducts> {
    return this.userProductService.removeUserProduct(rmdto);
  }

  @Post('update-user-product-by-user-product-id-and-user-id')
  async updateUserProductByUserProductIdAndUserId(
    @Body() updto: updateUserProductDto,
  ) {
    return await this.userProductService.UpdateUserProduct(updto);
  }

  @Post('get-user-product-by-user-id-and-product-id')
  async getUserProductByUserIdandProductId(@Body() gtdto: getUserProductDto) {
    return await this.userProductService.getUserProductByUserIdAndProductId(
      gtdto,
    );
  }
}
