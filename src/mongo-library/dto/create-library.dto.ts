import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CreateBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author?: string;
}

export class CreateLibraryDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookDto)
  books: CreateBookDto[];
}
