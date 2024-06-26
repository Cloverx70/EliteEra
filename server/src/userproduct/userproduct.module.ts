import { Module } from '@nestjs/common';
import { UserproductController } from './userproduct.controller';
import { UserproductService } from './userproduct.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { Products } from 'src/entities/entities/Products';
import { Cart } from 'src/entities/entities/Cart';

@Module({
  imports: [TypeOrmModule.forFeature([Userproducts, Products, Cart])],
  controllers: [UserproductController],
  providers: [UserproductService],
})
export class UserproductModule {}
