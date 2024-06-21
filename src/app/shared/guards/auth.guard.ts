import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard = () => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('accessToken')) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return;
  }
}