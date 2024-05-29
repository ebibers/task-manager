import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'task-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-nav-bar.component.html',
  styleUrl: './task-nav-bar.component.scss'
})
export class TaskNavBarComponent {
}