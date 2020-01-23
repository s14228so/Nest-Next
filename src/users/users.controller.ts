import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Get(":id")
  getUsers(@Param("id") id) {
    const user = this.usersService.findUserByID(id)
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