import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = environment.API_DOMAIN + 'users/';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + id);
  }
}
