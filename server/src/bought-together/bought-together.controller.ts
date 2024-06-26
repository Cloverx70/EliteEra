import { Body, Controller, Param, Post } from '@nestjs/common';
import { BoughtTogetherService } from './bought-together.service';

@Controller('bought-together')
export class BoughtTogetherController {
  constructor(private readonly BTogetherService: BoughtTogetherService) {}

  @Post('get-all-btogether-products-by-product-id/:id')
  async getAllBTogetherProductsByProductId(@Param('id') prodid: number) {
    return await this.BTogetherService.getAllBTogetherProductsByProductId(
      prodid,
    );
  }

  @Post('add-btogether-products-by-product-id/:id')
  async addBTogetherProductByProductId(@Param('id') prodid: number) {
    return await this.BTogetherService.addBTogetherProductByProductId(prodid);
  }

  @Post('remove-btogether-product-by-product-id-and-btogether-id')
  async removeBTogetherProducByProductIdAndBtogetherId(
    @Body()
    prodid: number,
    Btogetherid: number,
  ) {
    return await this.BTogetherService.removeBTogetherProducByProductIdAndBtogetherId(
      prodid,
      Btogetherid,
    );
  }

  @Post('update-btogether-product-by-product-id-and-btogether-id')
  async updateBTogetherProductByProductIdAndBtogetherId(
    @Body()
    prodid: number,
    btogetherId: number,
    newprodid: number,
  ) {
    return await this.BTogetherService.updateBTogetherProductByProductIdAndBtogetherId(
      prodid,
      btogetherId,
      newprodid,
    );
  }
}
