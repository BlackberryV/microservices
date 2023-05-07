import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SellerDto } from './dto/seller';
import { SellerService } from './seller.service';
import { Seller } from './types/seller';

@Controller('categories')
export class SellerController {
  constructor(private readonly categoriesService: SellerService) {}

  @Get()
  getCategories(): Seller[] {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number): Seller {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() dto: SellerDto): Seller[] {
    return this.categoriesService.createCategory(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: SellerDto): Seller[] {
    return this.categoriesService.updateCategory(id, dto);
  }
}
