import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/crearTask.dto';
import { UpdateStatusTaskDto } from './dto/updateStatusTask.dto';

@Injectable()
export class TaskService {
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>;

    async findAll(): Promise<Task[]>{
        return this.taskRepository.find();
    }

    async findOne(id: number): Promise<Task>{
        const task = await this.taskRepository.findOneBy({id});
        if(!task){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND,);
        }
        return task;
    }

    async create(task : CreateTaskDto): Promise<Task>{
        const newTask = await this.taskRepository.create(task)
        return this.taskRepository.save(newTask)
    }

    async update(id: number, task: CreateTaskDto): Promise<Task>{
        const existingTask = await this.findOne(id);
        if(!existingTask){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        const updatedTask = Object.assign(existingTask, task);
        return this.taskRepository.save(updatedTask);
        
    }

    async updateStatus(id: number, status: UpdateStatusTaskDto): Promise<Task>{
        const existingTask = await this.taskRepository.findOneBy({id});
        if(!existingTask){
            throw new HttpException(`Task ${id} not found`, HttpStatus.NOT_FOUND);
        }
        existingTask.status = status.status;
        return this.taskRepository.save(existingTask);
    }

    async delete(id: number): Promise<void>{
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0){
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        };


    }

}
