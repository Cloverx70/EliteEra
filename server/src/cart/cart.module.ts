import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/entities/Cart';
import { Users } from 'src/entities/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Users])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
