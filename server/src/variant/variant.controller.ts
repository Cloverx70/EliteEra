import { Controller, Param, Post } from '@nestjs/common';
import { VariantService } from './variant.service';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post('get-variants-by-product-id/:id')
  async getVariantsByProductId(@Param('id') ProductId: number) {
    return await this.variantService.getVariantsByProductId(ProductId);
  }

  @Post('remove-variant-by-variant-id/:id')
  async RemoveVariantByVariantId(@Param('id') VariantId: number) {
    return await this.variantService.RemoveVariantByVariantId(VariantId);
  }
}
