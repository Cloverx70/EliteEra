import { Column, Entity, Index } from "typeorm";

@Index("collection_id", ["collectionId"], { unique: true })
@Index("collection_product_id", ["collectionProductId"], { unique: true })
@Index("product_id", ["productId"], { unique: true })
@Entity("collectionproducts", { schema: "ecommerce" })
export class Collectionproducts {
  @Column("int", { primary: true, name: "collection_product_id" })
  collectionProductId: number;

  @Column("int", { name: "product_id", unique: true })
  productId: number;

  @Column("int", { name: "collection_id", unique: true })
  collectionId: number;
}
