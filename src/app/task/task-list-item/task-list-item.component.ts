import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'task-list-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss'
})
export class TaskListItemComponent {
  isChecked : boolean = false;
  @Input() task!:Task;

  togleComplete() {
    this.task.status = !this.task.status;
  }
}