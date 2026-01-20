import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Products } from './product/entities/product.entity';
import { Categories } from './category/entities/category.entity';
import { Publishers } from './publisher/entities/publisher.entity';
import { Users } from './user/entities/user.entity';
import { Comments } from './comment/entities/comment.entity';
import { PublisherModule } from './publisher/publisher.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Products, Categories, Publishers, Users, Comments],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    PublisherModule,
    UserModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
