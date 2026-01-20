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
import { PublishersService } from '../services/publisher.service';
import { Publishers } from '../entities/publisher.entity';

@Controller('/publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAllPublishers(): Promise<Publishers[]> {
    return this.publishersService.findAllPublishers();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findPublisherById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Publishers> {
    return this.publishersService.findPublisherById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPublisher(@Body() publisher: Publishers): Promise<Publishers> {
    return this.publishersService.createPublisher(publisher);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  updatePublisher(@Body() publisher: Publishers): Promise<Publishers> {
    return this.publishersService.updatePublisher(publisher);
  }
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePublisher(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.deletePublisher(id);
  }
}
