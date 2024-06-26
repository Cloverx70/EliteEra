import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cart', { schema: 'ecommerce' })
export class Cart {
  @PrimaryColumn('int', { primary: true, name: 'cart_id' })
  cartId: number;

  @Column('int', { name: 'user_id', unique: true })
  userID: number;

  @Column('varchar', { name: 'username', unique: true, length: 100 })
  username: string;

  @Column('int', { name: 'cart_total', default: 0 })
  cartTotal: number;

  @Column('int', { name: 'cart_items_number', default: 0 })
  cartItemsNumber: number;
}
