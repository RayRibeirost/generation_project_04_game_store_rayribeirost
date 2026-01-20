import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductsController } from './controllers/product.controller';
import { ProductsService } from './services/product.service';
import { PublisherModule } from '../publisher/publisher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    CategoryModule,
    PublisherModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [],
})
export class ProductModule {}
