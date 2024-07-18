import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('btogetherproduct', { schema: 'ecommerce' })
export class BtogetherProduct {
  @PrimaryColumn('int', {
    name: 'bought_together_product_id',
    unique: true,
    nullable: false,
  })
  boughtTogetheProductId: number;

  @Column('int', { name: 'product_id', unique: false, nullable: false })
  productId: number;

  @Column('json', {
    name: 'bought-together-product-ids',
    unique: false,
    nullable: false,
  })
  boughtTogetherProductIds: number[];
}
