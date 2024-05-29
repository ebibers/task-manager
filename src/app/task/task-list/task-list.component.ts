import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskListItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  taskList : Task[] = new Array();

  constructor(private taskService : TaskService) {}

  ngOnInit(): void {
    this.taskList = this.taskService.getAllTasks();
  }

  removeTask(index : any) {
    this.taskService.removeTask(index);
  }
}
