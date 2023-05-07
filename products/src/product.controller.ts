import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct, ProductDto } from './types/product';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): IProduct[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number): IProduct {
    return this.productService.getProductById(id);
  }

  @Post()
  createCategory(@Body() dto: ProductDto): IProduct[] {
    return this.productService.createNewProduct(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: ProductDto): IProduct[] {
    return this.productService.updateProduct(id, dto);
  }
}
