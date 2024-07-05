import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { adminGuard } from './shared/guards/role.guard';
import { UserDetailsComponent } from './user/user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'task-list',
        pathMatch: 'full'
      },
      {
        path: 'create-task',
        component: CreateTaskComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'task-list',
        component: TaskListComponent
      },
      {
        path: 'task-details/:id',
        component: TaskDetailsComponent,
      }
    ]
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user-details/:id',
        component: UserDetailsComponent
      }
    ]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '500',
    component: ServerErrorComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
