import { Column, Entity, Index } from 'typeorm';

@Index('IDX_246038d1c47c99f7d844620d79', ['productTitle'], { unique: true })
@Index('product_id', ['productId'], { unique: true })
@Index('product_title', ['productTitle'], { unique: true })
@Entity('products', { schema: 'ecommerce' })
export class Products {
  @Column('int', { primary: true, name: 'product_id' })
  productId: number;

  @Column('int', { name: 'collection_id', unique: false })
  collectionId: number;

  @Column('json', { name: 'variant_id', nullable: true })
  variantIds: { [key: string]: number };

  @Column('int', { name: 'category_id', unique: false })
  categoryId: number;

  @Column('int', { name: 'btogether_id', unique: false })
  btoghetherId: number;

  @Column('int', { name: 'reviews_id', unique: true })
  reviewsId: number;

  @Column('varchar', { name: 'product_picture', nullable: true, length: 200 })
  productPicture: string | null;

  @Column('varchar', {
    name: 'product_picture_second',
    nullable: true,
    length: 200,
  })
  productSecondPicture: string | null;

  @Column('varchar', {
    name: 'product_picture_third',
    nullable: true,
    length: 200,
  })
  productThirdPicture: string | null;

  @Column('varchar', {
    name: 'product_picture_fourth',
    nullable: true,
    length: 200,
  })
  productFourthPicure: string | null;

  @Column('varchar', { name: 'product_title', unique: false, length: 100 })
  productTitle: string;

  @Column('varchar', { name: 'product_origin', length: 100 })
  productOrigin: string;

  @Column('varchar', {
    name: 'product_description',
    nullable: true,
    length: 900,
  })
  productDescription: string | null;

  @Column('varchar', {
    name: 'product_about',
    default: '',
    nullable: false,
    length: 3000,
  })
  productAbout: string | null;
  @Column('double', { name: 'product_price', precision: 22 })
  productPrice: number;

  @Column('int', { name: 'product_stock', default: () => "'0'" })
  productStock: number;

  @Column('int', { name: 'product_rating', default: () => "'0'" })
  productRating: number;

  @Column('varchar', {
    name: 'product_season',
    length: 50,
    default: () => "'Summer'",
  })
  productSeason: string;
}
