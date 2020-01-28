import { CreatePostData } from './posts.dto';
import { PostsService } from './posts.service';
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

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

  @Delete(":id")
  deletePost(@Param("id") id): void {
    this.postsService.deletePost(id)
    return
  }
}
