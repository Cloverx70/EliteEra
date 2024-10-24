import { Column, Entity, PrimaryColumn } from 'typeorm';

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
    length: 1000,
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
  @Column('timestamp', {
    name: 'date_created',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column('int', { name: 'upvotes', default: 0 })
  upVotes: number;

  @Column('int', { name: 'downvotes', default: 0 })
  downVotes: number;

  @Column('json', {
    name: 'upvotedusers',
    unique: false,
    nullable: false,
  })
  upvotedUsers: number[];

  @Column('json', { name: 'downvotedusers', unique: false, nullable: false })
  downvotedUsers: number[];
}
