import { IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;
  description: string;
  status: string;
}
