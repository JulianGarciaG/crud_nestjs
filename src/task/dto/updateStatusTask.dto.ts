import { IsEnum } from 'class-validator';
import { TaskStatus } from '../status/status-task';

export class UpdateStatusTaskDto {
  @IsEnum(TaskStatus, {
    message: 'Invalid status',
  })
  status: TaskStatus;
}
