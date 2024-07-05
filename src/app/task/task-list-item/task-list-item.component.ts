import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task } from '../shared/models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'task-list-item',
  standalone: true,
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, MatSlideToggleModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  @Input() task: Task | null = null;
  @Output() toggleCompleteEvent = new EventEmitter<{id: string, task: Task}>();
  @Output() removeTaskEvent = new EventEmitter<string>();

  authService = inject(AuthService);

  togleComplete(id: any) {
    if (this.task) {
      const newTask = this.task;

      newTask.status = !newTask.status;

      this.toggleCompleteEvent.emit({id: id, task: newTask});
    }
  }

  removeTask(id: any) {
    this.removeTaskEvent.emit(id);
  }
}
