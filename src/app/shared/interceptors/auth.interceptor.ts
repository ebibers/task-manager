import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('accessToken') ?? '';

    request = request.clone({
      setHeaders: {
        authorization: token ? `Bearer ${token}` : '',
      }
    })
  }
  
  return next(request);
}