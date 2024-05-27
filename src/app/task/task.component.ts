import { Component, Input } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Task } from '../../shared/models/task.model';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent, CreateTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  taskList : Task[] = new Array();

  addTask(task: Task) {
    this.taskList.push(task);
  }
}
