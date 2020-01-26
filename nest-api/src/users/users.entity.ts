import { Post } from './../posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ length: 16 })
  email: string;

  @Column({ length: 256 })
  uid: string;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];
}