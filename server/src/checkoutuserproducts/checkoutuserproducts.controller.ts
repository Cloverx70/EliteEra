import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CheckoutuserproductsService } from './checkoutuserproducts.service';
import { CheckoutDto } from './dtos/checkout.dto';
import { jwtguard } from 'src/auth/guards/JWTguard';
import { getCheckoutDto } from './dtos/getCheckout.dto';
import { adminGuard } from 'src/admin/guards/adminGuard';
import { updateCheckoutStatusDto } from './dtos/updateCheckoutStatus.dto';

@UseGuards(jwtguard)
@Controller('checkoutuserproducts')
export class CheckoutuserproductsController {
  constructor(
    private readonly CheckoutUserProductService: CheckoutuserproductsService,
  ) {}

  @Post('checkout-by-user-product-and-user-id')
  async Checkout(@Body() checkoutDto: CheckoutDto) {
    return await this.CheckoutUserProductService.Checkout(checkoutDto);
  }
  @UseGuards(jwtguard, adminGuard)
  @Post('get-checkout-by-user-product-and-user-id')
  async getCheckout(@Body() getCheckoutDto: getCheckoutDto) {
    return await this.CheckoutUserProductService.getCheckout(getCheckoutDto);
  }

  @UseGuards(jwtguard, adminGuard)
  @Post('get-checkout-by-checkout-id/:checkoutid')
  async getCheckoutByCheckoutId(@Param('checkoutid') checkoutId: number) {
    return await this.CheckoutUserProductService.getCheckoutByCheckoutId(
      checkoutId,
    );
  }

  @UseGuards(jwtguard)
  @Post('get-all-checkouts-by-user-id/:userid')
  async getAllCheckoutsByUserId(@Param('userid') userid: number) {
    return await this.CheckoutUserProductService.getAllCheckoutsByUserId(
      userid,
    );
  }
  @UseGuards(jwtguard, adminGuard)
  @Post('get-all-checkouts')
  async getAllChekcouts() {
    return await this.CheckoutUserProductService.getAllCheckouts();
  }

  @UseGuards(jwtguard, adminGuard)
  @Post('update-checkout-by-checkout-id/:checkoutid')
  async updateCheckoutStatus(
    @Param('checkoutid') checkoutId: number,
    @Body() updateCheckoutStatusDto: updateCheckoutStatusDto,
  ) {
    return await this.CheckoutUserProductService.updateCheckoutStatus(
      checkoutId,
      updateCheckoutStatusDto,
    );
  }
}
