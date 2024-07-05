import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, of, Subject, switchMap, takeWhile, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [AsyncPipe, MatSelectModule, MatIconModule, MatButtonModule, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<User> | null = null;
  private destroy$: Subject<void> = new Subject<void>();
  editable: boolean = false;

  roleForm = new FormGroup({
    roles: new FormControl()
  });

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      map(params => params.get("id")),
      switchMap(id => {
        if (id) {
          return this.userService.getUser(id).pipe(
            catchError(err => {
              this.router.navigate(['/404']);
              
              return of();
            }),
            tap((user) => {
              this.roleForm.setValue({
                roles: user.roles
              });
            })
          );
        } else {
          this.router.navigate(['/404']);
        
          return of();
        }
      })
    )
  }

  onEdit() {
    this.editable = true;
  }

  onSave(user: User) {
    if (user.roles.includes("Admin")) {
      this.roleForm.value.roles?.push("Admin");
    }

    const editedUser: User = {
      id: user.id,
      roles: this.roleForm.value.roles as string[],
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

  onCancel(roles: string[]) {
    this.roleForm.reset({ roles: roles });

    this.editable = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}