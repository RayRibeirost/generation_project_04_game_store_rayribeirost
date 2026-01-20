import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { Comments } from './entities/comment.entity';
import { UserModule } from '../user/user.module';
import { CommentsController } from './controllers/comment.controller';
import { CommentsService } from './services/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), ProductModule, UserModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [],
})
export class CommentModule {}
