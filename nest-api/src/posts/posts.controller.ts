import { CreatePostData } from './posts.dto';
import { PostsService } from './posts.service';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }
  @Get()
  getAllPosts() {
    const allPosts = this.postsService.findAllPosts()
    return allPosts
  }

  @Post()
  createPost(@Body() postData: CreatePostData) {
    const newPost = this.postsService.insertPost(postData)
    return newPost
  }
}
