import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  loginError: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }

      this.authService.login(loginData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loginError = false;

          localStorage.setItem('accessToken', response.accessToken);

          localStorage.setItem('refreshToken', response.refreshToken);

          this.authService.currentUser.set(response.user);

          this.router.navigate(['/tasks/task-list']);
        },

        error: (err) => {
          this.loginError = true;
        }
      })
    }
  }
}