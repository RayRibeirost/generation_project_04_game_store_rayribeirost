import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from '../services/comment.service';
import { Comments } from '../entities/comment.entity';

@Controller('/comentarios')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllComments(): Promise<Comments[]> {
    return this.commentsService.findAllComments();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findCommentById(@Param('id') id: string): Promise<Comments> {
    return this.commentsService.findCommentById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body() comment: Comments): Promise<Comments> {
    return this.commentsService.createComment(comment);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updateComment(@Body() comment: Comments): Promise<Comments> {
    return this.commentsService.updateComment(comment);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
