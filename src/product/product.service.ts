import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: { id: number; name: string; price: number }[] = [
    { id: 1, name: 'Mobile', price: 62000 },
    { id: 2, name: 'Laptop', price: 55000 },
    { id: 3, name: 'Tablet', price: 32000 },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
