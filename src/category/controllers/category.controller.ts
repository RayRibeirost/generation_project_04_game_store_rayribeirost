import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from '../services/category.service';
import { Categories } from '../entities/category.entity';

@Controller('/categorias')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllCategories(): Promise<Categories[]> {
    return this.categoriesService.findAllCategories();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findCategoryById(@Param('id', ParseIntPipe) id: number): Promise<Categories> {
    return this.categoriesService.findCategoryById(id);
  }
  @Get('/is_active')
  @HttpCode(HttpStatus.OK)
  findAllActiveCategories(): Promise<Categories[]> {
    return this.categoriesService.findAllActiveCategories();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() category: Categories): Promise<Categories> {
    return this.categoriesService.createCategory(category);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updateCategory(@Body() category: Categories): Promise<Categories> {
    return this.categoriesService.updateCategory(category);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
