/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product_exist = await this.productRepository.findOne({
        where: { name: createProductDto.name },
      });
      console.log('product_exist', product_exist);
      if (product_exist) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Product with the same name exist',
          },
          HttpStatus.CONFLICT,
        );
      }
      const product = this.productRepository.create(createProductDto);
      return this.productRepository.save(product);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'error creating user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new NotFoundException('Error while fetching products');
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    console.log('product', product);
    if (!product) {
      console.log('product not found');
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      console.log('product not found to update');
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found to update',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      console.log('product not found to Delte');
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found to Delte',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.productRepository.remove(product);
  }
}
