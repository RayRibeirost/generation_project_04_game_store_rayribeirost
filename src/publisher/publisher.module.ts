import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publishers } from './entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publishers])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PublisherModule {}
