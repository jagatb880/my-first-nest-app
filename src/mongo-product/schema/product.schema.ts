import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tag } from './tag.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  // One to Many relationship with Tag with embedded documents
  @Prop({ type: [Tag] })
  tags: Tag[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
