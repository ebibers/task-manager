import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'register-root',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, TranslateModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  registerError: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  register() {
    if (this.registerForm.valid) {
      const registerData = {
        roles: ['User'],
        firstName: this.registerForm.value.firstName as string,
        lastName: this.registerForm.value.lastName as string,
        username: this.registerForm.value.username as string,
        password: this.registerForm.value.password as string
      }

      this.authService.register(registerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.registerError = false;

          this.authService.login({ username: registerData.username, password: registerData.password })
          .pipe(takeUntil(this.destroy$))
          .subscribe((response) => {
            localStorage.setItem('accessToken', response.accessToken);

            localStorage.setItem('refreshToken', response.refreshToken);

            this.authService.currentUser.set(response.user);

            this.router.navigate(['/tasks/task-list']);
          })
        },

        error: () => {
          this.registerError = true;
        }
      })
    }
  }
}