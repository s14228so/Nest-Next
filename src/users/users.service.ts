import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAllUsers(): Promise<User[] | undefined> {
    const user = await this.userRepository.find({ relations: ["posts"] });
    return user
  }


  async findUserByScreenName(screenName: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { screenName }, relations: ["posts"] });
    return user
  }

  findUserByID(id: number): Promise<User> {
    const user = this.userRepository.findOne({ where: { id }, relations: ["posts"] });
    return user
  }

  async register(userData: Partial<User>): Promise<void> {
    if (await this.findUserByScreenName(userData.screenName)) {
      return Promise.reject(new Error('User is already taken.'));
    }
    await this.userRepository.insert({
      ...userData
    });
    return;
  }
}