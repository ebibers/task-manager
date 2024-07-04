import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, catchError } from 'rxjs';
import { ParamMap } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatButtonModule, MatTooltipModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<User> | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  editable: boolean = false;

  roleForm = new FormGroup({
    user: new FormControl({ value: false, disabled: true }),
    manager: new FormControl(false)
  });

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe((params : ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.getUser(id);
      }
    });
  }

  onEdit(roles: string[]) {
    const isUser = roles.includes('User');

    const isManager = roles.includes('Manager');

    this.roleForm.setValue({
      user: isUser,
      manager: isManager
    });

    this.editable = true;
  }

  onSave(user: User) {
    let roles: string[] = ["User"];

    if (this.roleForm.value.manager) {
      roles.push("Manager");
    }

    if (user.roles.includes("Admin")) {
      roles.push("Admin");
    }

    const editedUser: User = {
      id: user.id,
      roles: roles,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password
    }

    this.user$ = this.userService.updateUser(editedUser)
    .pipe(
      catchError(err => {
        this.router.navigate(['/500']);
        
        return of();
      })
    );

    this.editable = false;
  }

  onCancel() {
    this.roleForm.reset();

    this.editable = false;
  }

  getUser(id: string) {
    this.user$ = this.userService.getUser(id)
    .pipe(
      catchError(err => {
        this.router.navigate(['/404']);

        return of();
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}