/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

/* eslint-disable prettier/prettier */
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name cannot be number' })
  name: string;

  @IsNotEmpty({ message: 'Age column cannot be empty' })
  @IsNumber({}, { message: 'Age should be Number' })
  @Min(18, { message: 'age cannot be below 18' })
  age: number;

  @IsNotEmpty({ message: 'Designation cannot be empty' })
  @IsString({ message: 'Designation should be string' })
  designation: string;
}
