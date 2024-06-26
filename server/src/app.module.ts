import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserproductModule } from './userproduct/userproduct.module';
import { ProductModule } from './product/product.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionproductsModule } from './collectionproducts/collectionproducts.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { CartController } from './cart/cart.controller';
import { CartModule } from './cart/cart.module';
import { VariantModule } from './variant/variant.module';
import { BoughtToghetherModule } from './bought-together/bought-together.module';
import { BoughtTogetherService } from './bought-together/bought-together.service';
import { BoughtTogetherController } from './bought-together/bought-together.controller';
import { ReviewsModule } from './reviews/reviews.module';
import { StatisticsModule } from './statistics/statistics.module';
import { CheckoutuserproductsModule } from './checkoutuserproducts/checkoutuserproducts.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    UserproductModule,
    ProductModule,
    CollectionModule,
    CollectionproductsModule,
    AuthModule,
    AdminModule,
    NewsletterModule,
    CartModule,
    VariantModule,
    BoughtToghetherModule,
    ReviewsModule,
    StatisticsModule,
    CheckoutuserproductsModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
