import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { Library } from './schema/library.schema';
import { MongoLibraryService } from './mongo-library.service';

@Controller('mongo-library')
export class MongoLibraryController {
  constructor(private readonly libraryService: MongoLibraryService) {}

  //   {
  //     "name": "City Central Library",
  //     "books": [
  //         {
  //         "title": "Clean Code",
  //         "author": "Robert C. Martin"
  //         },
  //         {
  //         "title": "Design Patterns",
  //         "author": "Erich Gamma"
  //         },
  //         {
  //         "title": "The Pragmatic Programmer",
  //         "author": "Andrew Hunt"
  //         }
  //     ]
  //  }

  @Post()
  async createLibrary(@Body() libraryData: CreateLibraryDto): Promise<Library> {
    return this.libraryService.createLibrary(libraryData);
  }

  @Get()
  async getAllLibraries(): Promise<Library[]> {
    return this.libraryService.getAllLibraries();
  }
}
