import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { maxLength } from 'class-validator';
import { Products } from 'src/entities/entities/Products';
import { Users } from 'src/entities/entities/Users';
import { review } from 'src/entities/entities/review';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { updateReviewDto } from './Dtos/updateReview.dto';
import { addReviewsDto } from './Dtos/addReviewsDto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(review) private readonly reviewsRepo: Repository<review>,
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  ) {}

  async getAllReviewsByProductId(prodid: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { productId: prodid },
      });

      const reviews = await this.reviewsRepo.find({
        where: { productId: prodid },
      });

      if (reviews) return reviews;
      else return null;
    } catch (error) {
      console.error(error);
    }
  }

  async addReviewByUserIdAndProductId(addReviewsDto: addReviewsDto) {
    try {
      const product = await this.productRepo.findOne({
        where: { productId: addReviewsDto.prodid },
      });

      const user = await this.userRepo.findOne({
        where: { userId: addReviewsDto.uid },
      });

      const review = this.reviewsRepo.create({
        reviewId: Math.floor(Math.random() * 10000) + 1000,
        productId: addReviewsDto.prodid,
        userid: addReviewsDto.uid,
        username: user.username,
        userPfp: user.userpfp,
        rating: addReviewsDto.rating,
        message: addReviewsDto.message,
      });

      const reviews = await this.reviewsRepo.find();
      if (reviews.length !== 0) {
        let prodrating = 0;
        reviews.forEach((element) => {
          prodrating = prodrating + element.rating;
        });
        prodrating = Math.ceil(prodrating / reviews.length);

        product.productRating = prodrating;

        await this.productRepo.save(product);
      }
      await this.reviewsRepo.save(review);
      if (user && review) return review;
      else return null;
    } catch (error) {
      console.error(error);
    }
  }

  async removeReviewByUserIdAndProductId(userid: number, productid: number) {
    const review = await this.reviewsRepo.findOne({
      where: { userid: userid, productId: productid },
    });

    await this.reviewsRepo.remove(review);

    if (review) return review;
    else return null;
  }

  async updateReviewByUserIdAndProductId(
    userid: number,
    productid: number,
    request: updateReviewDto,
  ) {
    const review = await this.reviewsRepo.findOne({
      where: { userid: userid, productId: productid },
    });

    review.rating = request.rating;
    review.message = request.message;

    await this.reviewsRepo.save(review);

    if (review) return review;
    else return null;
  }
}
