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
  @Get('/disponiveis/:is_active')
  @HttpCode(HttpStatus.OK)
  findActiveProducts(
    @Param('is_active') is_active: string,
  ): Promise<Products[]> {
    const active = is_active === 'true';
    return this.productsService.findActiveProducts(active);
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
