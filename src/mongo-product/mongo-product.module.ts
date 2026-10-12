import { Module } from '@nestjs/common';
import { MongoProductService } from './mongo-product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { MongoProductController } from './mongo-product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [MongoProductService],
  controllers: [MongoProductController],
})
export class MongoProductModule {}
