import { Component, Input } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../../shared/models/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent, CreateTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  taskList : Task[] = new Array();

  constructor(private taskService : TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data : any) => {
      this.taskList = data;
    });
  }

  addTask(task: Task) {
    this.taskList.push(task);
  }
}
