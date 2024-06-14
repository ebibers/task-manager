import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { newTask } from '../shared/models/task.model';
import { Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import {MatSelectModule} from '@angular/material/select';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, MatSelectModule, TaskListComponent, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  users$: Observable<User[]> = this.userService.getAllUsers();

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required)
  });

  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createTask() {
    if (this.taskForm.valid) {
      const newTask: newTask = {
        title: this.taskForm.value.title as string,
        description: this.taskForm.value.description as string,
        type: this.taskForm.value.type as string,
        createdOn: new Date,
        status: false,
        assignedTo: this.taskForm.value.assignedTo as string
      }
      
      this.taskService.createTask(newTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks/task-list']);
        },

        error: () => {
          this.router.navigate(['/404']);
        }
      });
    } 
  }
}
