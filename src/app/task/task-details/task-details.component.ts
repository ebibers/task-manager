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
      let index = params.get('index');
      this.task = this.taskService.getTask(index);

      if (this.task == null) {
        this.router.navigate(['/404']);
      }
    });
  }
}