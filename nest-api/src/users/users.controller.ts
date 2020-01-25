import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  HttpException,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAllUsers(@Query("uid") uid) {
    if (uid) {
      const user = this.usersService.findUserByUID(uid)
      return user
    } else {
      const users = this.usersService.findAllUsers()
      return users
    }
  }
  @Get(":id")
  getUsers(@Param("id") id) {
    const user = this.usersService.findUserByID(id)
    return user
  }

  @Post("login")
  login(@Body() loginUserDTO: LoginUserDTO) {
    const user = this.usersService.loginUserByEmail(loginUserDTO)
    return user
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      await this.usersService.register(createUserDTO);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }
    return;
  }
}