import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter) // Apply the custom exception filter to this controller
export class ExceptionController {
  @Get('hello/:id')
  getException(@Param('id', ParseIntPipe) id: number) {
    return { message: `Hello, your ID is ${id}`, status: 200 };
  }
}
