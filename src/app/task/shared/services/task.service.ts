import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task.model";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  BASE_URL: string = environment.API_DOMAIN;

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.BASE_URL);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(this.BASE_URL + id);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.BASE_URL, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<Task>(this.BASE_URL + id, task);
  }

  removeTask(id: string): Observable<Task> {
    return this.http.delete<Task>(this.BASE_URL + id);
  }
}
