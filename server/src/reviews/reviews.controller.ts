import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { updateReviewDto } from './Dtos/updateReview.dto';
import { addReviewsDto } from './Dtos/addReviewsDto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('get-all-reviews-by-product-id/:id')
  async getAllReviewsByProductId(@Param('id') prodid: number) {
    return await this.reviewService.getAllReviewsByProductId(prodid);
  }

  @Post('add-review-by-user-id-and-product-id')
  async addReviewByUserIdAndProductId(@Body() addReviewsDto: addReviewsDto) {
    return await this.reviewService.addReviewByUserIdAndProductId(
      addReviewsDto,
    );
  }

  @Post('remove-review-by-user-id-and-product-id')
  async removeReviewByUserIdAndProductId(@Body() uid: number, prodid: number) {
    return await this.reviewService.removeReviewByUserIdAndProductId(
      uid,
      prodid,
    );
  }

  @Post('update-review-by-user-id-and-product-id')
  async updateReviewByUserIdAndProductId(
    @Body()
    uid: number,
    prodid: number,
    request: updateReviewDto,
  ) {
    return await this.reviewService.updateReviewByUserIdAndProductId(
      uid,
      prodid,
      request,
    );
  }
}
