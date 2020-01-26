import { CreatePostData } from './posts.dto';
import { Post } from './posts.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) { }

  async findAllPosts() {
    const posts = await this.postRepository.find({ relations: ["user"] })
    return posts
  }

  async insertPost(postData: Partial<CreatePostData>): Promise<void> {
    const user = await this.postRepository.findOne({ where: { id: postData.userId } })
    await this.postRepository.insert({
      ...postData,
      user
    });
    return
  }

}
