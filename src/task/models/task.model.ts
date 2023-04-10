import { Schema, Document } from "mongoose";


const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    status: String,
    created_at: { type: Date, required: true, default: Date.now },
  },
  {
    collection: 'task'
  },
);
export {TaskSchema};


export interface Task extends Document {
  title: string;
  description: string;
  status: string;
}