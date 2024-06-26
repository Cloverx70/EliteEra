import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { addUserProductdto } from './dtos/adduserproduct.dto';
import { Products } from 'src/entities/entities/Products';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { CartService } from 'src/cart/cart.service';
import { rmeoveUserProductDto } from './dtos/removeUserProduct.dto';
import { updateUserProductDto } from './dtos/updateUser.dto';
import { getUserProductDto } from './dtos/getuserProduct.dto';
import { Cart } from 'src/entities/entities/Cart';
import { cartDto } from 'src/cart/dtos/cartDto';

@Injectable()
export class UserproductService {
  constructor(
    @InjectRepository(Userproducts)
    private readonly userProductRepo: Repository<Userproducts>,
    @InjectRepository(Products)
    private readonly ProductRepo: Repository<Products>,
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}

  async getUserProductsByUserId(id: number) {
    try {
      return await this.userProductRepo.find({ where: { userId: id } });
    } catch (error) {
      console.error(error);
    }
  }

  async getUserProductByUserProductId(userproductid: number) {
    try {
      const userproduct = await this.userProductRepo.findOne({
        where: { userProductId: userproductid },
      });
      return userproduct;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserProductByUserIdAndProductId(gtdto: getUserProductDto) {
    try {
      const userProduct = await this.userProductRepo.findOne({
        where: { userId: gtdto.uid, productId: gtdto.pid },
      });

      return userProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async addUserProduct(req: addUserProductdto) {
    try {
      const Product = await this.ProductRepo.findOne({
        where: { productId: req.productid },
      });

      const userproduct = this.userProductRepo.create({
        userProductId: Math.floor(Math.random() * 10000) + 1000,
        userId: req.userid,
        productId: req.productid,
        productPicture: Product.productPicture,
        productTitle: Product.productTitle,
        productDescription: Product.productDescription,
        productPrice: Product.productPrice * req.qty,
        qty: req.qty,
      });
      await this.userProductRepo.save(userproduct);

      return userproduct;
    } catch (error) {
      console.error(error);
    }
  }

  async removeUserProduct(rmdto: rmeoveUserProductDto) {
    try {
      const userproduct = await this.userProductRepo.findOne({
        where: { userProductId: rmdto.userproductId, userId: rmdto.userId },
      });
      await this.userProductRepo.remove(userproduct);

      return userproduct;
    } catch (error) {
      console.error(error);
    }
  }

  async UpdateUserProduct(updto: updateUserProductDto) {
    try {
      const userProduct = await this.userProductRepo.findOne({
        where: { userProductId: updto.userproductid, userId: updto.userid },
      });

      const cart = await this.cartRepo.findOne({
        where: { userID: updto.userid },
      });

      cart.cartTotal += updto.price;
      cart.cartItemsNumber += updto.qty;

      userProduct.qty += updto.qty;
      userProduct.productPrice += updto.price;

      await this.userProductRepo.save(userProduct);
      await this.cartRepo.save(cart);
      const response = {
        userproduct: userProduct,
        cart: cart,
      };

      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
