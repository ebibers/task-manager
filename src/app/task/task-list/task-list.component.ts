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

  constructor(private taskService : TaskService) {
    this.taskService.listen('createTask', (task : any) => {
      this.taskList.push(task);
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data : any) => {
      this.taskList = data;
    });
  }

  removeTask(index : any, taskList : Task[]) {
    this.taskList = this.taskService.removeTask(index, taskList);
  }
}
