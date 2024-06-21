import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { currentUser } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<currentUser | undefined | null>(undefined);

  refreshingToken: boolean = false;

  BASE_URL: string = environment.API_DOMAIN + 'users/';

  constructor(private http: HttpClient) {}

  login(userCredentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'login', userCredentials);
  }

  getAuthUser(): Observable<currentUser> {
    return this.http.get<currentUser>(this.BASE_URL + 'auth-user');
  }

  logout(token: string): Observable<string> {
    return this.http.delete<string>(this.BASE_URL + 'logout', { body: { token: token } });
  }

  refreshToken(token: string): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'token', { token: token });
  }
}