import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskNavBarComponent } from './shared/components/task-nav-bar/task-nav-bar.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterOutlet, TaskNavBarComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
}
