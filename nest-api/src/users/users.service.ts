import { LoginUserDTO, CreateUserDTO } from './users.dto';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import firebase from "../plugins/firebase"

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

  authCheck() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("authStateChanged:", user)
        return user
      }
    })
  }



  async findUserByScreenName(screenName: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { screenName }, relations: ["posts"] });
    return user
  }

  findUserByID(id: number): Promise<User> {
    const user = this.userRepository.findOne({ where: { id }, relations: ["posts"] });
    return user
  }
  findUserByUID(uid: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { uid }, relations: ["posts"] });
    return user
  }

  async loginUserByEmail(loginUserDTO: LoginUserDTO) {
    const { user } = await firebase.auth().signInWithEmailAndPassword(loginUserDTO.email, loginUserDTO.password)
    return user
  }

  async register(userData: Partial<CreateUserDTO>): Promise<void> {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
    const newUser: Partial<User> = {
      name: userData.name,
      uid: user.uid,
      email: user.email
    }
    await this.userRepository.insert({
      ...newUser
    });

    return;
  }
}