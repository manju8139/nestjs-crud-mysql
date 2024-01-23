/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateProductDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name is String' })
  name: string;

  @IsNotEmpty({ message: 'Price cannot be Empty' })
  @IsNumber({}, { message: 'Price cannot be a string' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number;

  @IsNotEmpty({ message: 'Price cannot be Empty' })
  @IsNumber({}, { message: 'Price cannot be a string' })
  @Min(0, { message: 'Price cannot be negative' })
  qty: number;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name is String' })
  desc: string;
}
