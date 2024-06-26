import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsletter } from 'src/entities/entities/NewsLetter';
import { Repository } from 'typeorm';
import { addemailtonewsletter } from './dtos/addemailtonewsletter';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Newsletter)
    private readonly newsLetterRepo: Repository<Newsletter>,
  ) {}

  async addEmailToNewsletter(req: addemailtonewsletter) {
    const newsletter = this.newsLetterRepo.create({
      emailId: Math.floor(Math.random() * 10000) + 1,
      email: req.email,
    });

    await this.newsLetterRepo.save(newsletter);

    return newsletter;
  }
}
