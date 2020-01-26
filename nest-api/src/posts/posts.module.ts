import { UsersModule } from './../users/users.module';
import { UsersService } from './../users/users.service';
import { User } from './../users/users.entity';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [TypeOrmModule]
})
export class PostsModule { }
