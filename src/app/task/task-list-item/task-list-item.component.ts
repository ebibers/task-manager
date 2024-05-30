import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'task-list-item',
  standalone: true,
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() task! : Task;
  @Input() index : any;

  constructor(private taskService : TaskService) {}

  togleComplete() {
    this.taskService.toggleComplete(this.index);
    console.log(this.task.status);
  }

  removeTask(index : any) {
    this.taskService.removeTask(index);
  }
}
