import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, catchError, filter, find, of, switchMap, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'task-details',
  standalone: true,
  imports: [DatePipe, AsyncPipe, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule, MatSlideToggleModule, MatInputModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  task$: Observable<Task> | null = null;
  users$: Observable<User[]> = this.userService.getAllUsers();
  assignedUser$: Observable<User> | null = null;
  editable: boolean = false;

  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl(false, Validators.required),
    assignedTo: new FormControl('', Validators.required)
  });

  constructor(private taskService: TaskService, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe((params : ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.getTask(id);
        this.getAssignedUser();
      }
    });
  }

  getTask(id: string) {
    this.task$ = this.taskService.getTask(id)
    .pipe(
      catchError(err => {
        this.router.navigate(['/404']);

        return of();
      })
    );
  }

  getAssignedUser() {
    if (this.task$) {
      this.assignedUser$ = this.task$.pipe(
        switchMap(task => 
          this.users$.pipe(
            switchMap(users => 
              of(...users).pipe(
                find(user => user.id === task.assignedTo),
                filter((user): user is User => user !== undefined)
              )
            )
          ))
      );
    }
  }

  onEdit(task: Task) {
    this.editForm.setValue({
      title: task.title,
      description: task.description,
      type: task.type,
      status: task.status,
      assignedTo: task.assignedTo
    });

    this.editable = !this.editable;
  }

  onCancel() {
    this.editForm.reset();

    this.editable = !this.editable;
  }

  onSave(task: Task) {
    if (this.editForm.valid) {
      const editedTask: Task = {
        id: task.id,
        title: this.editForm.value.title as string,
        description: this.editForm.value.description as string,
        type: this.editForm.value.type as string,
        createdOn: task.createdOn,
        status: this.editForm.value.status as boolean,
        assignedTo: this.editForm.value.assignedTo as string
      }

      this.task$ = this.taskService.updateTask(task.id, editedTask)
      .pipe(
        catchError(err => {
          this.router.navigate(['/500']);
          
          return of();
        })
      );

      this.editable = !this.editable;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}