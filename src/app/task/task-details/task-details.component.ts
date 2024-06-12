import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DatePipe, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'task-details',
  standalone: true,
  imports: [DatePipe, AsyncPipe, MatIconModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule, MatSlideToggleModule, MatInputModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  task$: Observable<Task> | null = null;
  editable: boolean = false;

  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl(false, Validators.required)
  });

  constructor(private taskService: TaskService, private router : Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe((params : ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.getTask(id);
      }
    });
  }

  getTask(id: string) {
    this.task$ = this.taskService.getTask(id);
  }

  onEdit(task: Task) {
    this.editForm.setValue({
      title: task.title,
      description: task.description,
      type: task.type,
      status: task.status
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
      }

      this.taskService.updateTask(task.id, editedTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getTask(task.id);
        this.editable = !this.editable;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}