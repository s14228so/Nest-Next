
import { User } from './../users/users.entity';
import { CreatePostData } from './posts.dto';
import { Post } from './posts.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm"
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findAllPosts() {
    const posts = await this.postRepository.find({ relations: ["user"] })
    return posts
  }

  async insertPost(postData: Partial<CreatePostData>): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: postData.userId } })
    console.log(postData.userId)
    console.log({ user })
    await this.postRepository.insert({
      ...postData,
      user
    });
    return
  }

}
