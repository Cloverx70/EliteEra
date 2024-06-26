import { Column, Entity, Index } from 'typeorm';

@Index('User_product_id', ['userProductId'], { unique: true })
@Entity('userproducts', { schema: 'ecommerce' })
export class Userproducts {
  @Column('int', { primary: true, name: 'User_product_id' })
  userProductId: number;

  @Column('int', { name: 'User_id', nullable: false, default: 0 })
  userId: number;

  @Column('int', { name: 'product_id', default: 0, nullable: false })
  productId: number;

  @Column('varchar', { name: 'product_picture', nullable: true, length: 200 })
  productPicture: string | null;

  @Column('varchar', { name: 'product_title', length: 100 })
  productTitle: string;

  @Column('varchar', {
    name: 'product_description',
    nullable: true,
    length: 900,
  })
  productDescription: string | null;

  @Column('double', { name: 'product_price', precision: 22 })
  productPrice: number;

  @Column('int', { name: 'qty', nullable: false, default: 0 })
  qty: number;
}
