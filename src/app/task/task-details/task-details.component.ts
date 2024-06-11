import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'task-details',
  standalone: true,
  imports: [DatePipe, MatIconModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule, MatSlideToggleModule, MatInputModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  task : Task | null = null;
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
    this.taskService.getTask(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: Task) => {
        this.task = data;
      },

      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  onEdit() {
    this.editForm.setValue({
      title: this.task?.title as string,
      description: this.task?.description as string,
      type: this.task?.type as string,
      status: this.task?.status as boolean
    });

    this.editable = !this.editable;
  }

  onCancel() {
    this.editForm.reset();

    this.editable = !this.editable;
  }

  onSave() {
    if (this.editForm.valid) {
      const editedTask: Task = {
        id: this.task?.id as string,
        title: this.editForm.value.title as string,
        description: this.editForm.value.description as string,
        type: this.editForm.value.type as string,
        createdOn: this.task?.createdOn as Date,
        status: this.editForm.value.status as boolean,
      }

      const id = this.task?.id;

      if (id) {
        this.taskService.updateTask(id, editedTask).subscribe(() => {
          this.getTask(id);
          this.editable = !this.editable;
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}