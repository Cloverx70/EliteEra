import { Body, Controller, Post } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { addemailtonewsletter } from './dtos/addemailtonewsletter';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('add-email')
  async addEmailToNewsletter(@Body() email: addemailtonewsletter) {
    return await this.newsletterService.addEmailToNewsletter(email);
  }
}
