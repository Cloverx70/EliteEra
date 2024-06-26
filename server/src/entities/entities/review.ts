import { Column, Entity, NumericType, PrimaryColumn } from 'typeorm';

@Entity('review', { schema: 'ecommerce' })
export class review {
  @PrimaryColumn('int', { name: 'review_id', nullable: false, unique: true })
  reviewId: number;

  @Column('int', { name: 'product_id', nullable: false, unique: false })
  productId: number;

  @Column('int', { name: 'user_id', nullable: false, unique: false })
  userid: number;

  @Column('varchar', {
    name: 'user_pfp',
    nullable: true,
    unique: false,
    length: 200,
  })
  userPfp: string | null;

  @Column('varchar', {
    name: 'username',
    nullable: false,
    unique: false,
    length: 100,
  })
  username: string;

  @Column('int', { name: 'rating', nullable: false, default: 0 })
  rating: number;

  @Column('varchar', {
    name: 'message',
    nullable: false,
    default: '',
    unique: false,
  })
  message: string;
}
