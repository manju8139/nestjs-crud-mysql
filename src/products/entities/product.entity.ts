/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable prettier/prettier */
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name is String' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Price cannot be empty' })
  @IsNumber({}, { message: 'Price can only be number' })
  @Min(0, { message: 'price cannot be negative' })
  price: number;

  @Column()
  @IsNotEmpty({ message: 'Qty cannot be empty' })
  @IsNumber({}, { message: 'Qty can only be number' })
  @Min(0, { message: 'Qty cannot be negative' })
  qty: number;

  @Column()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name is String' })
  desc: string;
}
