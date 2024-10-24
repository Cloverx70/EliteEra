export class updateProductDto {
  title: string;
  description: string;
  origin: string;
  stock: string;
  productPrice: number;
  bgTitle: string;
  variants: [
    {
      variantId: number;
      prodid: number;
      variantName: string;
      variantDetails: { [key: string]: string };
      variantType: string;
    },
  ];
}
