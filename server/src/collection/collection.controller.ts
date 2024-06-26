import { Body, Controller, Post } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collections } from 'src/entities/entities/Collections';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post('get-all-collections')
  async getAllCollections(): Promise<Collections[]> {
    return await this.collectionService.getAllCollections();
  }

  @Post('get-collection-by-id/:id')
  async getCollectionById(id: number): Promise<Collections> {
    return await this.collectionService.getCollectionById(id);
  }

  @Post('add-collection')
  async addcollection(@Body() req: Collections): Promise<Collections> {
    return await this.collectionService.createCollection(req);
  }

  @Post('remove-collection-by-id/:id')
  async removeCollectionById(id: number): Promise<Collections> {
    return await this.collectionService.removeCollectionById(id);
  }
}
