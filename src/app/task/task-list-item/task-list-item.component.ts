import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';

@Component({
  selector: 'task-list-item',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() task! : Task;
  @Input() index : any;

  constructor(private taskService : TaskService) {}

  togleComplete() {
    this.taskService.toggleComplete(this.index);
  }
}
