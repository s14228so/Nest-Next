import { User } from './../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  body: string;

  @ManyToOne(type => User, user => user.posts)
  user: User;
}