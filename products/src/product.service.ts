import { Injectable } from '@nestjs/common';
import { IProduct, ProductDto } from './types/product';

@Injectable()
export class ProductService {
  private readonly products: IProduct[] = [
    {
      id: 1,
      title: 'apple',
      description: 'good fruit',
      price: 5,
      category: 'food',
    },
    {
      id: 2,
      title: 'iphone',
      description: 'expensive phone',
      price: 1000,
      category: 'smartphones',
    },
    {
      id: 3,
      title: 'nike no air',
      description: 'white shoes',
      price: 200,
      category: 'clothes',
    },
    {
      id: 4,
      title: 'zubrovka',
      description: '...',
      price: 25,
      category: 'alcohol',
    },
    {
      id: 5,
      title: 'fotball ball',
      description: 'good ball',
      price: 55,
      category: 'sport',
    },
  ];
  getProducts(): IProduct[] {
    return this.products;
  }
  getProductById(id: number): IProduct {
    return this.products[id - 1];
  }
  createNewProduct(dto: ProductDto): IProduct[] {
    const newProduct = { id: this.products.length + 1, ...dto };
    return [...this.products, newProduct];
  }
  updateProduct(id: number, dto: ProductDto): IProduct[] {
    const updatedProducts = this.products.map((prod) =>
      prod.id == id ? { id, ...dto } : prod,
    );
    return updatedProducts;
  }
}
