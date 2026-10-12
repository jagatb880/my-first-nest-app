import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';

@Schema()
export class Library extends Document {
  @Prop()
  name: string;

  // One to Many relationship with Book using referencing
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Types.ObjectId[] | Book[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
