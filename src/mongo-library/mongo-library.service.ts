import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Library } from './schema/library.schema';
import { Model } from 'mongoose';
import { CreateLibraryDto } from './dto/create-library.dto';

@Injectable()
export class MongoLibraryService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Library.name) private readonly libraryModel: Model<Library>,
  ) {}

  // Create a new library with one-to-many relationship to books using referencing
  async createLibrary(libraryData: CreateLibraryDto): Promise<Library> {
    // First create the books
    const createdBooks = await this.bookModel.insertMany(libraryData.books);

    // Extract their IDs
    const bookIds = createdBooks.map((book) => book._id);

    // Create the library referencing those books
    const library = await this.libraryModel.create({
      name: libraryData.name,
      books: bookIds,
    });

    return library.populate('books');
  }

  // Fetch all libraries with populated books
  async getAllLibraries(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
