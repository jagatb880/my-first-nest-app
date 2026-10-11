import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateProfileDto {
  @Type(() => Number)
  @IsInt()
  age: number;

  @IsString()
  qualification: string;
}

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}
