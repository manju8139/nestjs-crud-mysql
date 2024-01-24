/* eslint-disable prettier/prettier */
// import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  designation: string;
}
