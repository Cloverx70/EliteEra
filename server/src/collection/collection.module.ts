import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collections } from 'src/entities/entities/Collections';

@Module({
  imports: [TypeOrmModule.forFeature([Collections])],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
