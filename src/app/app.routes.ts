import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskComponent,
    children: [
      {
        path: '',
        redirectTo: 'task-list',
        pathMatch: 'full'
      },
      {
        path: 'create-task',
        component: CreateTaskComponent
      },
      {
        path: 'task-list',
        component: TaskListComponent
      },
      {
        path: 'task-details/:index',
        component: TaskDetailsComponent,
      }
    ]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
