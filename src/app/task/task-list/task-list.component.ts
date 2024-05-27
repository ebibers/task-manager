import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../shared/models/task.model';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskListItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks:Task[] = new Array();

  removeTask(index : any) {
    this.tasks.splice(index, 1);
  }
}
