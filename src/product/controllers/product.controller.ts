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
import { ProductsService } from '../services/product.service';
import { Products } from '../entities/product.entity';

@Controller('/produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllProducts(): Promise<Products[]> {
    return this.productsService.findAllProducts();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findProductById(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productsService.findProductById(id);
  }
  @Get('/categoria/:category')
  @HttpCode(HttpStatus.OK)
  findProductByCategory(
    @Param('category') category: string,
  ): Promise<Products[]> {
    return this.productsService.findProductsByCategory(category);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() product: Products): Promise<Products> {
    return this.productsService.createProduct(product);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updateProduct(@Body() product: Products): Promise<Products> {
    return this.productsService.updateProduct(product);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
