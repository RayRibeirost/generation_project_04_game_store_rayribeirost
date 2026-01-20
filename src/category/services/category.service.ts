import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Categories } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}
  async findAllCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.find({
      relations: { products: true },
    });
  }
  async findCategoryById(id: number): Promise<Categories> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return category;
  }
  async createCategory(category: Categories): Promise<Categories> {
    return await this.categoriesRepository.save(category);
  }
  async updateCategory(category: Categories): Promise<Categories> {
    await this.findCategoryById(category.id);
    return await this.categoriesRepository.save(category);
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    await this.findCategoryById(id);
    return await this.categoriesRepository.delete(id);
  }
}
