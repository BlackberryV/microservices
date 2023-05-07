import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category';
import { ICategory } from './types/category';

@Injectable()
export class CategoriesService {
  private readonly categories: ICategory[] = [
    { id: 0, title: 'clothes', subCategories: ['men', 'women'] },
    { id: 1, title: 'food', subCategories: ['vegan', 'no-gluten'] },
    { id: 2, title: 'furniture' },
    { id: 3, title: 'sport' },
    { id: 4, title: 'medicines' },
    { id: 5, title: 'alcohol' },
  ];

  getCategories(): ICategory[] {
    return this.categories;
  }

  getCategoryById(id: number): ICategory {
    console.log(id);

    return this.categories.find((category) => category.id === id);
  }

  createCategory(dto: CategoryDto): ICategory[] {
    const newCategory = { id: 10, ...dto };
    return [...this.categories, newCategory];
  }

  updateCategory(id: number, dto: CategoryDto): ICategory[] {
    const updatedCategories = this.categories.map((category) =>
      category.id === id ? { id, ...dto } : category,
    );
    return updatedCategories;
  }
}
