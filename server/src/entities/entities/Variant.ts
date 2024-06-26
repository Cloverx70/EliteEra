import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cart', { schema: 'ecommerce' })
export class Variants {
  @PrimaryColumn('int', { name: 'variant_id', unique: true, nullable: false })
  variantId: number;

  @Column('int', { name: 'product_id', unique: true, nullable: false })
  productId: number;
}
