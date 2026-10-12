import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Profile } from './profile.schema';

@Schema()
export class Employee extends Document {
  @Prop()
  name: string;

  // One to One relationship with Profile using referencing
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Profile.name })
  profile: Types.ObjectId | Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
