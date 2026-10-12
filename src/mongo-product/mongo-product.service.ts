import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongoProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  async getAllProducts(): Promise<Product[]> {
    console.log(
      'Fetching all products from the database...',
      this.productModel.find().exec(),
    );
    return this.productModel.find().exec();
  }
}
