import { IsInt, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly age: number;
}
