import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { Types } from 'mongoose';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts() {
    return this.postRepository.findManyBy({});
  }

  async getPostById(post_id: Types.ObjectId) {
    const post = this.postRepository.findOneById(post_id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(post_id: Types.ObjectId, data: UpdatePostDto) {
    return await this.postRepository.updateOneById(post_id, data);
  }

  async createPost(post: CreatePostDto) {
    return await this.postRepository.create(post);
  }

  async deletePost(post_id: Types.ObjectId) {
    return await this.postRepository.deleteOneById(post_id);
  }
}
