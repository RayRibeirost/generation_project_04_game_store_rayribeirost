import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { Comments } from './entities/comment.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), ProductModule, UserModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class CommentModule {}
