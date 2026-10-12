import { Body, Controller, Get, Post } from '@nestjs/common';
import { MongoProductService } from './mongo-product.service';
import { Product } from './schema/product.schema';

@Controller('mongo-product')
export class MongoProductController {
  constructor(private readonly productService: MongoProductService) {}

  //   {
  //     "title": "Gaming Laptop",
  //     "tags": [
  //         { "name": "tag1" },
  //         { "name": "tag2" },
  //         { "name": "tag3" }
  //     ]
  //   }
  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
