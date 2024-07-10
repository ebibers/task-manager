import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {MatSelectModule} from '@angular/material/select';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, TranslateModule, MatSelectModule, MatSidenavModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  
  authService = inject(AuthService);

  translate = inject(TranslateService);
  
  constructor (private router: Router, private appService: AppService) {
    this.appService.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      this.authService.logout(refreshToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        localStorage.setItem('accessToken', '');

        localStorage.setItem('refreshToken', '');

        this.authService.currentUser.set(null);

        this.router.navigate(['/login']);
      })
    }
  }

  ngOnInit(): void {
    this.authService.getAuthUser()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.authService.currentUser.set(response);
      },

      error: (err) => {
        this.authService.currentUser.set(null);
      }
    })
  }
}
