import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('checkoutuserproduct', { schema: 'ecommerce' })
export class CheckoutUserProduct {
  @PrimaryColumn('int', {
    name: 'checkout_id',
    unique: true,
    nullable: false,
  })
  checkoutId: number;

  @Column('int', {
    name: 'user_id',
    nullable: false,
    default: 0,
  })
  userId: number;

  @Column('json', {
    name: 'userproduct_id',
    nullable: true,
  })
  userProductId: { [key: string]: number };

  @Column('varchar', {
    name: 'user_full_name',
    nullable: false,
    length: 100,
  })
  userFullName: string;

  @Column('double', {
    name: 'product_price',
  })
  productPrice: number;

  @Column('double', {
    name: 'product_price_after_discount',
    nullable: true,
  })
  productPriceAfterDiscount: number;

  @Column('varchar', {
    name: 'promocode',
    nullable: true,
  })
  promocode: string;

  @Column('varchar', {
    name: 'payment_method',
    nullable: false,
    default: 'cod',
    length: 50,
  })
  paymentMethod: string;

  @Column('varchar', {
    name: 'payment_status',
    nullable: false,
    length: 50,
    default: 'unpaid',
  })
  paymentStatus: string;

  @Column('varchar', {
    name: 'wish_order_code',
    nullable: true,
    unique: true,
  })
  wishOrderCode: string | null;

  @Column('varchar', {
    name: 'order_special_instructions',
    nullable: true,
  })
  orderSpecialInstructions: string;

  @Column('varchar', {
    name: 'order_name',
    nullable: false,
    default: 'K',
  })
  orderName: string;

  @Column('varchar', {
    name: 'order_email',
    nullable: false,
    default: 'k@gmail.com',
  })
  orderEmail: string;

  @Column('int', {
    name: 'order_phone',
    nullable: false,
    default: 1234,
  })
  orderPhone: number;

  @Column('int', {
    name: 'bring_change_value',
    nullable: true,
  })
  bringChange: number | null;

  @Column('varchar', {
    name: 'delivery_status',
    nullable: false,
    default: 'products in store',
  })
  deliveryStatus: string;
}
