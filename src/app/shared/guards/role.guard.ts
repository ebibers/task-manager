import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.getAuthUser().subscribe(res => {
    if (res.roles.includes("Admin")) {
      return true;
    } else {
      router.navigate(['']);
      return false;
    }
  })
}