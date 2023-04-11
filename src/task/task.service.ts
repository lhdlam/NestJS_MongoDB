import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Types } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository){}



  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create(createTaskDto)
  }

  async findAll() {
    return await this.taskRepository.findAll()
  }

  async findOne(id: string) {
    return await this.taskRepository.findById(id)
  }

  async updateCreate(id: string, updateTaskDto: UpdateTaskDto) {
    // const dataTask = await this.taskRepository.findOneById(id)
    // const reponse = {
    //   ...updateTaskDto,
    //   status_up : Number(dataTask.status) + 1, 
    // }
    // console.log(reponse)
    return await this.taskRepository.findByIdAndUpdate(id, updateTaskDto)
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
