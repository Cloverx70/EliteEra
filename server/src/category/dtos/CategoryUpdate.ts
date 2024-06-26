export class CategoryUpdateDto {
  CategoryName: string;
  CategoryProductIds: { [key: string]: number };
}
