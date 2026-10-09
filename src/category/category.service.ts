import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  getCategory(): string[] {
    return ['Mobile', 'Laptop', 'Tablet'];
  }
}
