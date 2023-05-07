import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category';
import { ICategory } from './types/category';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): ICategory[] {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number): string {
    console.log(id);

    // return this.categoriesService.getCategoryById(id);
    return 'asdfasdfasfd';
  }

  @Post()
  createCategory(@Body() dto: CategoryDto): ICategory[] {
    return this.categoriesService.createCategory(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CategoryDto): ICategory[] {
    return this.categoriesService.updateCategory(id, dto);
  }
}
