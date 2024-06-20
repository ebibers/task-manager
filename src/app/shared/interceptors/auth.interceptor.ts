import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";


export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('accessToken') ?? '';

    request = request.clone({
      setHeaders: {
        authorization: token ? `Bearer ${token}` : '',
      }
    })

    return next(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (!authService.refreshingToken) {
            authService.refreshingToken = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
              return authService.refreshToken(refreshToken).pipe(
                switchMap(response => {
                  localStorage.setItem('accessToken', response.accessToken);

                  request = request.clone({
                    setHeaders: {
                      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                  })

                  authService.refreshingToken = false;

                  return next(request);
                }),
                catchError((err) => {
                  localStorage.setItem('accessToken', '');

                  localStorage.setItem('refreshToken', '');

                  authService.currentUser.set(null);

                  router.navigate(['/login']);

                  authService.refreshingToken = false;

                  return throwError(() => err);
                })
              )
            } else {
              localStorage.setItem('accessToken', '');

              localStorage.setItem('refreshToken', '');

              authService.currentUser.set(null);

              router.navigate(['/login']);

              authService.refreshingToken = false;
            }
          }
        }

        return throwError(() => err);
      })
    )
  }

  return next(request);
}