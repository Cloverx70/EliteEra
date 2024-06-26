import {
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsObject,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CheckoutDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  userId: number;

  @IsObject()
  @ValidateNested()
  userProductId: { [key: string]: number };

  @IsString()
  @IsOptional()
  promocode: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsNumber()
  @IsString()
  @IsPositive()
  whishCode: string;

  @IsString()
  @IsOptional()
  specialInstructions: string;

  @IsString()
  @IsNotEmpty()
  orderName: string;

  @IsString()
  @IsNotEmpty()
  orderEmail: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  orderPhone: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  bringChange: number;
}
