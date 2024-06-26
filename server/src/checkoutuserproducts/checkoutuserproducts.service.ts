import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckoutUserProduct } from 'src/entities/entities/CheckoutUserProudct';
import { Repository } from 'typeorm';
import { CheckoutDto } from './dtos/checkout.dto';
import { Users } from 'src/entities/entities/Users';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { Products } from 'src/entities/entities/Products';
import { promocode } from 'src/entities/entities/promocode';
import { getCheckoutDto } from './dtos/getCheckout.dto';

@Injectable()
export class CheckoutuserproductsService {
  constructor(
    @InjectRepository(CheckoutUserProduct)
    private readonly checkoutUserProductRepo: Repository<CheckoutUserProduct>,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(Userproducts)
    private readonly userProductRepo: Repository<Userproducts>,
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
    @InjectRepository(promocode)
    private readonly promocodeRepo: Repository<promocode>,
  ) {}

  async Checkout(checkout: CheckoutDto) {
    try {
      console.log(checkout);
      function generateRandomString(length: number): string {
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }

      const randomString = generateRandomString(10);

      const user = await this.userRepo.findOne({
        where: { userId: checkout.userId },
      });

      const userproduct = await this.userProductRepo.find({
        where: { userId: checkout.userId },
      });

      console.log(userproduct);

      const promocode = await this.promocodeRepo.findOne({
        where: { promocode: checkout.promocode },
      });
      let ProducstPrice = 0;

      if (!user || !userproduct) throw NotFoundException;
      else {
        userproduct.forEach((element) => {
          ProducstPrice += element.productPrice;
        });
      }

      const UserCheckout = this.checkoutUserProductRepo.create({
        checkoutId: Math.floor(Math.random() * 10000) + 1000,
        userId: checkout.userId,
        userProductId: checkout.userProductId,
        userFullName: user.fullname,
        productPrice: ProducstPrice,
        productPriceAfterDiscount:
          checkout.promocode && checkout.promocode === promocode.promocode
            ? ProducstPrice - ProducstPrice * (promocode.percentage / 100)
            : ProducstPrice,

        promocode: checkout.promocode,
        paymentMethod: checkout.paymentMethod,
        paymentStatus: 'unpaid',
        wishOrderCode:
          checkout.paymentMethod === 'w2w' || 'visa' ? randomString : '',
        orderSpecialInstructions: checkout.specialInstructions,
        orderName: checkout.orderName,
        orderEmail: checkout.orderEmail,
        orderPhone: checkout.orderPhone,
        bringChange: checkout.bringChange,
        deliveryStatus: 'Produts in Store',
      });

      await this.checkoutUserProductRepo.save(UserCheckout);
      return UserCheckout;
    } catch (error) {
      console.error(error);
    }
  }

  async getCheckout(getCheckoutDto: getCheckoutDto) {
    try {
      const userProductId = JSON.stringify(getCheckoutDto.userproductids);

      const query = `
        SELECT * FROM checkoutuserproduct
        WHERE user_id = ? AND JSON_CONTAINS(userproduct_id, ?)
        LIMIT 1
      `;

      const result = await this.checkoutUserProductRepo.query(query, [
        getCheckoutDto.userid,
        userProductId,
      ]);

      if (result.length > 0) {
        return result[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getCheckoutByCheckoutId(checkoutId: number) {
    try {
      const result = await this.checkoutUserProductRepo.findOne({
        where: { checkoutId: checkoutId },
      });
      if (result) return result;
      else return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
