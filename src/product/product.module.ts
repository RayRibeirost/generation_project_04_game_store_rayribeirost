import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), CategoryModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProductModule {}
