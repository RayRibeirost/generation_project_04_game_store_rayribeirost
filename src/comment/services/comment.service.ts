import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '../entities/comment.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}
  async findAllComments(): Promise<Comments[]> {
    return await this.commentsRepository.find();
  }
  async findCommentById(id: string): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
    });
    if (!comment)
      throw new HttpException(
        'Comentário não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    return comment;
  }
  async createComment(comment: Comments): Promise<Comments> {
    return this.commentsRepository.save(comment);
  }
  async updateComment(comment: Comments): Promise<Comments> {
    await this.findCommentById(comment.id);
    return await this.commentsRepository.save(comment);
  }
  async deleteComment(id: string): Promise<DeleteResult> {
    await this.findCommentById(id);
    return await this.commentsRepository.delete(id);
  }
}
