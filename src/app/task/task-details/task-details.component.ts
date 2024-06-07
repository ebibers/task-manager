import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'task-details',
  standalone: true,
  imports: [DatePipe, MatIconModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task : Task | null = null;

  constructor(private taskService: TaskService, private router : Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params : ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.taskService.getTask(id).subscribe({
          next: (data: Task) => {
            this.task = data;
          },

          error: () => {
            this.router.navigate(['/404']);
          }
        });
      }
    });
  }
}