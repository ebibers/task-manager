import { Component } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'user-list-item',
  standalone: true,
  imports: [RouterLink, MatIconModule, TranslateModule],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss'
})
export class UserListItemComponent {
  @Input() user: User | null = null;
}