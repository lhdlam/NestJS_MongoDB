import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, PaginationPostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
// import { User } from 'src/user/models/user.model';
// import { GetUser } from 'src/user/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  @Get()
  getAllPost(@Query() { page, limit, start }: PaginationPostDto) {
    return this.postService.getAllPosts(page, limit, start);
  }

  @Get(':id')
  // @UseFilters(HttpExceptionFilter)
  // @UseFilters(ExceptionLoggerFilter)
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(req.user, post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return true;
  }

  @Get('user/all')
  async getPostUser(@Req() req: any) {
    await req.user
      .populate({
        path: 'posts',
        select: 'title',
      })
      .execPopulate();
    return req.user.posts;
  };
  

  @Get('get/category')
  async getByCategory(@Query('category_id') category_id) {
    return await this.postService.getByCategory(category_id);
  }

  @Get('get/categories')
  async getByCategories(@Query('category_ids') category_ids) {
    return await this.postService.getByCategories(category_ids);
  }

  @Get('get/array')
  async getArray(){
    return this.postService.getByArray()
  }
}
