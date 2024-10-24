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
        upvotedUsers: [],
        downvotedUsers: [],
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
    uid: number,
    pid: number,
    request: updateReviewDto,
  ) {
    const review = await this.reviewsRepo.findOne({
      where: { userid: uid, productId: pid },
    });

    if (!review) {
      return null; // Return early if the review doesn't exist
    }

    // Ensure upvotedUsers and downvotedUsers are arrays
    review.upvotedUsers = review.upvotedUsers || [];
    review.downvotedUsers = review.downvotedUsers || [];

    // Check if user is already in upvoted or downvoted list
    const hasAlreadyUpvoted = review.upvotedUsers.includes(uid);
    const hasAlreadyDownvoted = review.downvotedUsers.includes(uid);

    // Prevent multiple upvotes/downvotes
    if (hasAlreadyUpvoted && request.upvote > 0) {
      return { message: 'You have already upvoted this review.' };
    }

    if (hasAlreadyDownvoted && request.downvote > 0) {
      return { message: 'You have already downvoted this review.' };
    }

    // Prevent upvoting/downvoting if the values are 0
    if (request.upvote === 0 && request.downvote === 0) {
      return {
        message: 'Invalid vote, both upvote and downvote cannot be zero.',
      };
    }

    // Handle upvote
    if (request.upvote > 0) {
      // If the user hasn't upvoted yet, add them to upvotedUsers and increment upVotes
      if (!hasAlreadyUpvoted) {
        review.upvotedUsers.push(uid);
        review.upVotes += 1;
      }

      // If the user is in downvotedUsers, remove them and adjust downVotes
      if (hasAlreadyDownvoted) {
        review.downvotedUsers = review.downvotedUsers.filter(
          (userId) => userId !== uid,
        );
        review.downVotes -= 1;
      }
    }

    // Handle downvote
    if (request.downvote > 0) {
      // If the user hasn't downvoted yet, add them to downvotedUsers and increment downVotes
      if (!hasAlreadyDownvoted) {
        review.downvotedUsers.push(uid);
        review.downVotes += 1;
      }

      // If the user is in upvotedUsers, remove them and adjust upVotes
      if (hasAlreadyUpvoted) {
        review.upvotedUsers = review.upvotedUsers.filter(
          (userId) => userId !== uid,
        );
        review.upVotes -= 1;
      }
    }

    // Update review message and rating if applicable
    if (review.rating !== 0 && review.message !== '') {
      review.rating = request.rating;
      review.message = request.message;
    }

    await this.reviewsRepo.save(review);

    return review;
  }
}
