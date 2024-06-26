import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('category', { schema: 'ecommerce' })
export class Category {
  @PrimaryColumn('int', { primary: true, name: 'category_id' })
  CategoryId: number;

  @Column('varchar', { name: 'category_name', unique: true, length: 100 })
  CategoryName: string;

  @Column('json', {
    name: 'category_product_ids',
    unique: false,
    nullable: true,
  })
  CategoryProductsIds: { [key: string]: number };

  @Column('int', { name: 'category_items_number', default: 0 })
  CategoryItemsNumber: number;
}
