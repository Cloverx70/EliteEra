import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { use } from 'passport';

@Injectable()
export class localStratetgy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authservice.validate({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
