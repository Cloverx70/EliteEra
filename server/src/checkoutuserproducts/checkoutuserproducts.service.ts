import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckoutUserProduct } from 'src/entities/entities/CheckoutUserProudct';
import { Repository } from 'typeorm';
import { CheckoutDto } from './dtos/checkout.dto';
import { Users } from 'src/entities/entities/Users';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { Products } from 'src/entities/entities/Products';
import { promocode } from 'src/entities/entities/promocode';
import { getCheckoutDto } from './dtos/getCheckout.dto';
import { use } from 'passport';
import { statistics } from 'src/entities/entities/statistics';
import { StatisticsService } from 'src/statistics/statistics.service';
import { updateCheckoutStatusDto } from './dtos/updateCheckoutStatus.dto';

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
    private readonly statService: StatisticsService,
  ) {}
  async Checkout(checkout: CheckoutDto) {
    try {
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

      if (!user) throw new NotFoundException('User not found');

      const userproduct = await this.userProductRepo.find({
        where: { userId: checkout.userId },
      });

      if (!userproduct.length)
        throw new NotFoundException('User products not found');

      const promocode = checkout.promocode
        ? await this.promocodeRepo.findOne({
            where: { promocode: checkout.promocode },
          })
        : null;

      let productsPrice = 0;

      const productIds: { [key: string]: number } = {};

      userproduct.forEach((element) => {
        productIds[element.productId] = element.productId;
        productsPrice += element.productPrice;
      });

      const productPriceAfterDiscount = promocode
        ? productsPrice - productsPrice * (promocode.percentage / 100)
        : productsPrice;

      const ProductPictures: { [key: string]: string } = {};

      const prodidsForPics = Object.values(productIds);

      prodidsForPics.forEach(async (element) => {
        const product = await this.productRepo.findOne({
          where: { productId: element },
        });

        [(ProductPictures[product.productTitle] = product.productPicture)];
      });

      const UserCheckout = this.checkoutUserProductRepo.create({
        checkoutId: Math.floor(Math.random() * 10000) + 1000,
        userId: checkout.userId,
        userProductId: checkout.userProductId,
        userFullName: user.fullname,
        productPrice: productsPrice,
        productPriceAfterDiscount,
        promocode: checkout.promocode,
        paymentMethod: checkout.paymentMethod,
        paymentStatus: 'unpaid',
        wishOrderCode:
          checkout.paymentMethod === 'w2w' || checkout.paymentMethod === 'visa'
            ? randomString
            : '',
        orderSpecialInstructions: checkout.specialInstructions,
        orderName: checkout.orderName,
        orderEmail: checkout.orderEmail,
        orderPhone: checkout.orderPhone,
        bringChange: checkout.bringChange,
        deliveryStatus: 'products in store',
        orderStatus: 'in progress',
        createdAt: new Date(),
        productIds,
        orderAddress: checkout.orderAddress,
        productImages: ProductPictures,
      });

      user.totalSpendings += UserCheckout.productPriceAfterDiscount;
      user.ongoingOrders += 1;

      const CreateStatsParams = {
        statId: 0,
        TotalEarnings: productPriceAfterDiscount,
        TotalPurchases: productPriceAfterDiscount,
        TotalUsers: 0,
        TotalProducts: 0,
        TotalOrders: 0,
      };

      this.statService.createStatistics(CreateStatsParams);

      await this.userRepo.save(user); // Update existing user
      await this.checkoutUserProductRepo.save(UserCheckout); // Save new checkout entity

      return UserCheckout;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error during checkout process');
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

  async getAllCheckoutsByUserId(userid: number) {
    try {
      const result = await this.checkoutUserProductRepo.find({
        where: { userId: userid },
      });

      if (result) return result;
      else return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllCheckouts() {
    try {
      const checkouts = await this.checkoutUserProductRepo.find();
      if (checkouts) return checkouts;
    } catch (error) {
      console.error(error);
    }
  }

  async updateCheckoutStatus(
    checkoutId: number,
    updateCheckoutStatus: updateCheckoutStatusDto,
  ) {
    try {
      const checkout = await this.checkoutUserProductRepo.findOne({
        where: { checkoutId: checkoutId },
      });

      if (checkout) {
        checkout.deliveryStatus = updateCheckoutStatus.Deliverystatus;
        checkout.paymentStatus = updateCheckoutStatus.Paymentstatus;
        if (updateCheckoutStatus.Orderstatus)
          checkout.orderStatus = updateCheckoutStatus.Orderstatus;
        await this.checkoutUserProductRepo.save(checkout);
        return checkout;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
