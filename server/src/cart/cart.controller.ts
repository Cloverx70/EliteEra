import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { cartDto } from './dtos/cartDto';

@UseGuards(jwtguard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('get-cart-by-user-id/:id')
  async getCartByUserId(@Param('id') userid: number) {
    return await this.cartService.getCartByUserId(userid);
  }
  @Post('add-new-cart-by-user-id/:id')
  async addNewCartByUserId(@Param('id') userid: number) {
    return await this.cartService.addNewCartByUserId(userid);
  }

  @Post('update-cart-by-user-id/:id')
  async updateCartByUserId(@Param('id') id: number, @Body() request: cartDto) {
    return await this.cartService.updateCartByUserId(id, request);
  }

  @Post('remove-cart-by-user-id/:id')
  async removeCartByUserId(@Param('id') userid: number) {
    return await this.cartService.removeCartByUserId(userid);
  }
}
