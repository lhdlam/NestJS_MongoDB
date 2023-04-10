import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Task } from 'src/task/models/task.model';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<Task>,
  ) {
    super(taskModel);
  }
}
