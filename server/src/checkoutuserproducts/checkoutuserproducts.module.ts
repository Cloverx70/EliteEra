import { Module, forwardRef } from '@nestjs/common';
import { CheckoutuserproductsController } from './checkoutuserproducts.controller';
import { CheckoutuserproductsService } from './checkoutuserproducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { promocode } from 'src/entities/entities/promocode';
import { Users } from 'src/entities/entities/Users';
import { CheckoutUserProduct } from 'src/entities/entities/CheckoutUserProudct';
import { Products } from 'src/entities/entities/Products';
import { Userproducts } from 'src/entities/entities/Userproducts';
import { StatisticsService } from 'src/statistics/statistics.service';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      promocode,
      Users,
      CheckoutUserProduct,
      Products,
      Userproducts,
    ]),
    forwardRef(() => StatisticsModule),
  ],
  controllers: [CheckoutuserproductsController],
  providers: [CheckoutuserproductsService],
})
export class CheckoutuserproductsModule {}
