import { Module } from '@nestjs/common';
import { MongoUserService } from './mongo-user.service';
import { MongoUserController } from './mongo-user.controller';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongoUserService],
  controllers: [MongoUserController],
})
export class MongoUserModule {}
