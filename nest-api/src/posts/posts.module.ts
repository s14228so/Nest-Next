import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [TypeOrmModule]
})
export class PostsModule { }
