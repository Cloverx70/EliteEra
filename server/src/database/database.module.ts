import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collectionproducts } from 'src/entities/entities/Collectionproducts';
import { Collections } from 'src/entities/entities/Collections';
import { Products } from 'src/entities/entities/Products';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { Users } from 'src/entities/entities/Users';
import { AdminEntity } from '../entities/entities/admins';
import { Newsletter } from 'src/entities/entities/NewsLetter';
import { Cart } from 'src/entities/entities/Cart';
import { BtogetherProduct } from 'src/entities/entities/Btogether';
import { review } from 'src/entities/entities/review';
import { productvariants } from 'src/entities/entities/productVariants';
import { statistics } from 'src/entities/entities/statistics';
import { CheckoutUserProduct } from '../entities/entities/CheckoutUserProudct';
import { promocode } from 'src/entities/entities/promocode';
import { Category } from 'src/entities/entities/Category';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kimokamaru@121',
      database: 'ecommerce',
      synchronize: true,
      entities: [
        Users,
        Products,
        Userproducts,
        Collections,
        Collectionproducts,
        AdminEntity,
        Newsletter,
        Cart,
        BtogetherProduct,
        review,
        productvariants,
        statistics,
        CheckoutUserProduct,
        promocode,
        Category,
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
