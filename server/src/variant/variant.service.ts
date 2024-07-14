import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variants } from 'src/entities/entities/Variant';
import { Repository } from 'typeorm';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variants)
    private readonly VariantRepo: Repository<Variants>,
  ) {}

  async getVariantsByProductId(ProductId: number) {
    try {
      const variants = await this.VariantRepo.find({
        where: { productId: ProductId },
      });

      return variants;
    } catch (error) {
      console.error(error);
    }
  }

  async RemoveVariantByVariantId(VariantId: number) {
    try {
      const variant = await this.VariantRepo.findOne({
        where: { variantId: VariantId },
      });
      if (variant) {
        return await this.VariantRepo.remove(variant);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
