import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  newTask!:Task;

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  });

  @Output() createTaskEvent = new EventEmitter<Task>();

  handleSubmit() {
    this.newTask = new Task(this.taskForm.value.title, this.taskForm.value.description, this.taskForm.value.type);
    this.createTaskEvent.emit(this.newTask);
  }
}
