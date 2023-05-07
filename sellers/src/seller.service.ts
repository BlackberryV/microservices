import { Injectable } from '@nestjs/common';
import { SellerDto } from './dto/seller';
import { Seller } from './types/seller';

@Injectable()
export class SellerService {
  private readonly categories: Seller[] = [
    { id: 0, name: 'Jake', phoneNumber: '+3807765654' },
    { id: 1, name: 'Kate', phoneNumber: '+3807231413' },
    { id: 2, name: 'Ann', phoneNumber: '+38077656542' },
    { id: 3, name: 'Tom', phoneNumber: '+38077656587' },
  ];

  getCategories(): Seller[] {
    return this.categories;
  }

  getCategoryById(id: number): Seller {
    return this.categories[id];
  }

  createCategory(dto: SellerDto): Seller[] {
    const newCategory = { id: 10, ...dto };
    return [...this.categories, newCategory];
  }

  updateCategory(id: number, dto: SellerDto): Seller[] {
    const updatedCategories = this.categories.map((category) =>
      category.id == id ? { id, ...dto } : category,
    );
    return updatedCategories;
  }
}
