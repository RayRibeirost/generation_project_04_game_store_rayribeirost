import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '../entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductsService } from '../../product/services/product.service';
import { UsersService } from '../../user/services/user.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}
  async findAllComments(): Promise<Comments[]> {
    return await this.commentsRepository.find({
      relations: { product: true, user: true },
    });
  }
  async findCommentById(id: string): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: { product: true, user: true },
    });
    if (!comment)
      throw new HttpException(
        'Comentário não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return comment;
  }
  async createComment(comment: Comments): Promise<Comments> {
    await this.productsService.findProductById(comment.product.id);
    await this.usersService.findUserById(comment.user.id);
    return this.commentsRepository.save(comment);
  }
  async updateComment(comment: Comments): Promise<Comments> {
    await this.findCommentById(comment.id);
    await this.productsService.findProductById(comment.product.id);
    await this.usersService.findUserById(comment.user.id);
    return await this.commentsRepository.save(comment);
  }
  async deleteComment(id: string): Promise<DeleteResult> {
    await this.findCommentById(id);
    return await this.commentsRepository.delete(id);
  }
}
