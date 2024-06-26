import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Cart } from 'src/entities/entities/Cart';
import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';
import { cartDto } from './dtos/cartDto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async getCartByUserId(userid: number) {
    const cart = await this.cartRepo.findOne({ where: { userID: userid } });

    return cart;
  }

  async addNewCartByUserId(userid: number) {
    const user = await this.userRepo.findOne({ where: { userId: userid } });
    const cart = this.cartRepo.create({
      cartId: Math.floor(Math.random() * 10000) + 1000,
      userID: user.userId,
      username: user.username,
    });
    await this.cartRepo.save(cart);
    if (cart) return cart;
    else return null;
  }

  async updateCartByUserId(userid: number, cartP: cartDto) {
    const cart = await this.cartRepo.findOne({ where: { userID: userid } });
    cart.cartTotal += cartP.MinusTotal;
    cart.cartItemsNumber += cartP.MinuscartItemsNumber;

    await this.cartRepo.save(cart);

    if (cart) return cart;
    else return null;
  }

  async removeCartByUserId(userid: number) {
    const cart = await this.cartRepo.findOne({ where: { userID: userid } });
    111;
    await this.cartRepo.remove(cart);
    return cart;
  }
}
