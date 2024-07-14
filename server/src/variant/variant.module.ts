import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variants } from 'src/entities/entities/Variant';

@Module({
  imports: [TypeOrmModule.forFeature([Variants])],
  providers: [VariantService],
  controllers: [VariantController],
})
export class VariantModule {}
