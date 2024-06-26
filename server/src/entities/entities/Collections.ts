import { Column, Entity, Index } from "typeorm";

@Index("collection_id", ["collectionId"], { unique: true })
@Index("collection_title", ["collectionTitle"], { unique: true })
@Entity("collections", { schema: "ecommerce" })
export class Collections {
  @Column("int", { primary: true, name: "collection_id" })
  collectionId: number;

  @Column("varchar", { name: "collection_title", unique: true, length: 100 })
  collectionTitle: string;

  @Column("varchar", { name: "collection_description", length: 400 })
  collectionDescription: string;

  @Column("varchar", { name: "collection_picture", length: 400 })
  collectionPicture: string;
}
