import { Controller, Post } from '@nestjs/common';
import { CollectionproductsService } from './collectionproducts.service';
import { addcollectionproduct } from './dtos/addcolelctionproduct.dto';
import { Collectionproducts } from 'src/entities/entities/Collectionproducts';
import { Products } from 'src/entities/entities/Products';

@Controller('collectionproducts')
export class CollectionproductsController {
  constructor(
    private readonly collectionProductsService: CollectionproductsService,
  ) {}

  @Post('get-products-by-collection-id/:id')
  async getProductsByCollectionId(id: number): Promise<Products[]> {
    return await this.collectionProductsService.getProductsByCollectionId(id);
  }

  @Post('add-product-to-collection-by-product-and-collection-id')
  async addProductToCollectionByProductIdAndCollectionId(
    req: addcollectionproduct,
  ): Promise<Collectionproducts> {
    return await this.collectionProductsService.addProductToCollectionByProductIdAndCollectionId(
      req,
    );
  }

  @Post('remove-product-collection-by-collection-product-id/:id')
  async removeProductCollectionByCollectionProudctId(
    id: number,
  ): Promise<Collectionproducts> {
    return await this.collectionProductsService.removeProductCollectionByCollectionProudctId(
      id,
    );
  }
}
