import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../shared/models/task.model';
import { Validators } from '@angular/forms';
import { TaskService } from '../shared/services/task.service';
import { TaskListComponent } from '../task-list/task-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [ReactiveFormsModule, TaskListComponent],
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
    this.newTask = new Task(this.taskForm.value.title, this.taskForm.value.description, this.taskForm.value.type);
    this.taskService.createTask(this.newTask);
    this.router.navigate(['/tasks/task-list']);
  }
}
