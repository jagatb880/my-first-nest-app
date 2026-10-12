import { Module } from '@nestjs/common';
import { MongoLibraryController } from './mongo-library.controller';
import { MongoLibraryService } from './mongo-library.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Library, LibrarySchema } from './schema/library.schema';
import { Book, BookSchema } from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Library.name, schema: LibrarySchema },
    ]),
  ],
  controllers: [MongoLibraryController],
  providers: [MongoLibraryService],
})
export class MongoLibraryModule {}
