import { Component } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from '../../shared/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskListItemComponent, MatDividerModule, AsyncPipe, TranslateModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks$ = this.taskService.getAllTasks();

  constructor(private taskService : TaskService, private authService: AuthService) {}

  updateTask(event: {id: string, task: Task}) {
    if (this.authService.isAdmin()) {
      this.tasks$ = this.taskService.updateTask(event.id, event.task)
      .pipe(
        map(res => res.newList)
      );
    }
  }

  removeTask(id: string) {
    if (this.authService.isAdmin()) {
      this.tasks$ = this.taskService.removeTask(id);
    }
  }
}
