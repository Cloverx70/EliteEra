import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { localStratetgy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { AdminService } from 'src/admin/admin.service';
import { AdminModule } from 'src/admin/admin.module';
import { AdminEntity } from 'src/entities/entities/admins';
import { Cart } from 'src/entities/entities/Cart';
import { CartService } from 'src/cart/cart.service';
import { statistics } from 'src/entities/entities/statistics';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'fwu4ihnw9uehh8fwijfq093094tjwv',
      signOptions: { expiresIn: '10d' },
    }),
    TypeOrmModule.forFeature([Users, AdminEntity, Cart, statistics]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    localStratetgy,
    jwtStrategy,
    AdminService,
    CartService,
  ],
})
export class AuthModule {}
