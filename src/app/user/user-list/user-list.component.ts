import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [MatDividerModule, AsyncPipe, UserListItemComponent, TranslateModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users$: Observable<User[]> = this.userService.getAllUsers();

  constructor(private userService: UserService) {}
}