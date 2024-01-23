/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure Swagger for Users module
  const usersConfig = new DocumentBuilder()
    .setTitle('Users-CRUD')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const usersDocument = SwaggerModule.createDocument(app, usersConfig, {
    include: [UserModule],
  });
  SwaggerModule.setup('api/users', app, usersDocument);

  // Configure Swagger for Products module
  const productsConfig = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('The Products API description')
    .setVersion('1.0')
    .build();
  const productsDocument = SwaggerModule.createDocument(app, productsConfig, {
    include: [ProductsModule],
  });
  SwaggerModule.setup('api/products', app, productsDocument);

  await app.listen(3000);
}

bootstrap();
