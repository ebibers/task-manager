import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskListItemComponent, MatDividerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  taskList : Task[] = new Array();

  constructor(private taskService : TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((data: any) => {
      this.taskList = data;
    });
  }
}
