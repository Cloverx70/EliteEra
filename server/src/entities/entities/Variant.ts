import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('variant', { schema: 'ecommerce' })
export class Variants {
  @PrimaryColumn('int', { name: 'variant_id', unique: true, nullable: false })
  variantId: number;

  @Column('int', { name: 'product_id', unique: false, nullable: false })
  productId: number;

  @Column('varchar', { name: 'variant_name', nullable: false, length: 255 })
  VariantName: string;

  @Column('json', { name: 'variant_details', nullable: false })
  VariantDetails: { [key: string]: string };

  @Column('varchar', { name: 'variant_type', nullable: false })
  VariantType: string;
}
