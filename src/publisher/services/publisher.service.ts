import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publishers } from '../entities/publisher.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publishers)
    private publishersRepository: Repository<Publishers>,
  ) {}
  async findAllPublishers(): Promise<Publishers[]> {
    return await this.publishersRepository.find();
  }
  async findPublisherById(id: number): Promise<Publishers> {
    const publisher = await this.publishersRepository.findOne({
      where: { id },
    });
    if (!publisher)
      throw new HttpException(
        'Publisher não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return publisher;
  }
  async createPublisher(publisher: Publishers): Promise<Publishers> {
    return await this.publishersRepository.save(publisher);
  }
  async updatePublisher(publisher: Publishers): Promise<Publishers> {
    await this.findPublisherById(publisher.id);
    return await this.publishersRepository.save(publisher);
  }
  async deletePublisher(id: number): Promise<DeleteResult> {
    await this.findPublisherById(id);
    return this.publishersRepository.delete(id);
  }
}
