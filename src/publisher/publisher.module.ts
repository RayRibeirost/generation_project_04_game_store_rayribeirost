import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publishers } from './entities/publisher.entity';
import { PublishersService } from './services/publisher.service';
import { PublishersController } from './controllers/publisher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Publishers])],
  providers: [PublishersService],
  controllers: [PublishersController],
  exports: [],
})
export class PublisherModule {}
