import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collections } from 'src/entities/entities/Collections';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collections)
    private readonly collectionRepo: Repository<Collections>,
  ) {}

  async getAllCollections() {
    try {
      return await this.collectionRepo.find();
    } catch (error) {
      console.error(error);
    }
  }

  async getCollectionById(id: number) {
    try {
      return await this.collectionRepo.findOne({ where: { collectionId: id } });
    } catch (error) {
      console.error(error);
    }
  }

  async createCollection(req: Collections) {
    try {
      const Collection = this.collectionRepo.create({
        collectionId: Math.floor(Math.random() * 10000) + 1000,
        collectionTitle: req.collectionTitle,
        collectionDescription: req.collectionDescription,
        collectionPicture: req.collectionPicture,
      });
      await this.collectionRepo.save(Collection);
      return Collection;
    } catch (error) {
      console.error(error);
    }
  }

  async removeCollectionById(id: number) {
    try {
      const collection = await this.collectionRepo.findOne({
        where: { collectionId: id },
      });
      await this.collectionRepo.remove(collection);
      return collection;
    } catch (error) {
      console.error(error);
    }
  }
}
