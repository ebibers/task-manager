import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../shared/models/task.model';
import { Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [ReactiveFormsModule, TaskListComponent, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  newTask : Task|null = null;

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor(private taskService: TaskService, private router: Router) {}

  createTask() {
    if (this.taskForm.value.title && this.taskForm.value.description && this.taskForm.value.type) {
      this.newTask = new Task(this.taskForm.value.title, this.taskForm.value.description, this.taskForm.value.type);
      
      this.taskService.createTask(this.newTask).subscribe(() => {
        this.router.navigate(['/tasks/task-list']);
      });
    } else {
      this.router.navigate(['/tasks/task-list']);
      return;
    }
  }
}
