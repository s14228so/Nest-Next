import { Post } from './posts/posts.entity';
import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestday7',
      entities: [User, Post],
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
  ],
  providers: [AppService],
})
export class AppModule { }