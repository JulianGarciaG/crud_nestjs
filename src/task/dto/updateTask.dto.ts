import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @Length(3, 20)
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
