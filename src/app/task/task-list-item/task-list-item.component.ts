import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() task!: Task;
  @Output() updateListEvent = new EventEmitter();

  constructor(private taskService: TaskService) {}

  togleComplete() {
    if (this.task.id) {
      this.taskService.toggleComplete(this.task.id, this.task).subscribe(() => {
        this.updateListEvent.emit();
      });
    }
  }

  removeTask(id: any) {
    this.taskService.removeTask(id).subscribe(() => {
      this.updateListEvent.emit();
    });
  }
}
