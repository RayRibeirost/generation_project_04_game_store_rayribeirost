import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CategoriesService } from '../../category/services/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    private categoriesService: CategoriesService,
  ) {}
  async findAllProducts(): Promise<Products[]> {
    return await this.productsRepository.find({
      relations: { category: true },
    });
  }
  async findProductById(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product)
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    return product;
  }
  async findActiveProducts(active: boolean): Promise<Products[]> {
    return await this.productsRepository.find({
      where: { is_active: active },
      relations: { category: true },
    });
  }
  async createProduct(product: Products): Promise<Products> {
    await this.categoriesService.findCategoryById(product.category.id);
    return await this.productsRepository.save(product);
  }
  async updateProduct(product: Products): Promise<Products> {
    await this.findProductById(product.id);
    await this.categoriesService.findCategoryById(product.category.id);
    return await this.productsRepository.save(product);
  }
  async deleteProduct(id: number): Promise<DeleteResult> {
    await this.findProductById(id);
    return await this.productsRepository.delete(id);
  }
}
