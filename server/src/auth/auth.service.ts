import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signin } from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { signup } from './dtos/signup.dto';
import { AdminEntity } from 'src/entities/entities/admins';
import { AdminService } from 'src/admin/admin.service';
import { CartService } from 'src/cart/cart.service';
import { sign } from 'crypto';
import { statistics } from 'src/entities/entities/statistics';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly AuthRepo: Repository<Users>,
    private readonly AdminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly cartService: CartService,
    @InjectRepository(statistics)
    private readonly StatRepo: Repository<statistics>,
  ) {}

  async signup(req: signup) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.password, salt);
      const user = this.AuthRepo.create({
        userId: Math.floor(Math.random() * 10000) + 1000,
        username: this.sanitizeInput(req.username),
        fullname: this.sanitizeInput(req.fullname),
        email: this.sanitizeInput(req.email),
        passwordhash: hashedPassword,
        addressOne: this.sanitizeInput(req.addressOne),
        addressTwo: this.sanitizeInput(req.addressTwo) || '',
        birthdate: req.birthdate,
      });

      const stat = await this.StatRepo.findOne({ where: { statId: 456456 } });
      stat.totalUsers += 1;

      await this.StatRepo.save(stat);
      await this.AuthRepo.save(user);

      const newUserCart = await this.cartService.addNewCartByUserId(
        user.userId,
      );

      const UserAndCart = {
        user,
        newUserCart,
      };

      return UserAndCart;
    } catch (error) {
      console.error(error);
    }
  }

  sanitizeInput(input: string) {
    const specialCharacters = [
      '<',
      '>',
      '&',
      '"',
      "'",
      '/',
      '\\',
      '=',
      '(',
      ')',
      '{',
      '}',
      ';',
      '--',
      '#',
      '/*',
      '*/',
      '%',
      '+',
      '?',
      '\n',
      '\r',
      '\t',
      '\v',
      '\f',
    ];

    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }

    let sanitized = input;

    for (let char of specialCharacters) {
      const charPattern = new RegExp(
        char.replace(/[*+?^${}()|[\]\\]/g, '\\$&'),
        'g',
      );
      sanitized = sanitized.replace(charPattern, '');
    }

    return sanitized;
  }

  async validate(signin: signin) {
    try {
      console.log(signin);
      const user = await this.AuthRepo.findOne({
        where: { email: this.sanitizeInput(signin.email) },
      });

      const admin =
        (await this.AdminService.getAdminUserByUserId(user.userId)) || null;

      let adminresponse = false;

      if (admin && admin.userID === user.userId) {
        adminresponse = true;
      }

      if (!user) return Response.json({ message: 'not found' });

      if (
        bcrypt.compareSync(
          this.sanitizeInput(signin.password),
          user.passwordhash,
        )
      ) {
        const payload = {
          email: user.email,
          userId: user.userId,
          username: user.username,
          addressone: user.addressOne,
          addresstwo: user.addressTwo,
          fullname: user.fullname,
          isAdmin: adminresponse,
        };
        const token = this.jwtService.sign(payload);
        return token;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
