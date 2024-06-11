import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import {MatDividerModule} from '@angular/material/divider';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [TaskListItemComponent, MatDividerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  taskList : Task[] = new Array();

  constructor(private taskService : TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Task[]) => {
      this.taskList = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTask(event: {id: string, task: Task}) {
    this.taskService.updateTask(event.id, event.task)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.getTasks();
    });
  }

  removeTask(id: string) {
    this.taskService.removeTask(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.getTasks();
    });
  }
}
