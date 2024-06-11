import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task, newTask } from "../models/task.model";
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

  createTask(task: newTask): Observable<newTask> {
    return this.http.post<newTask>(this.BASE_URL, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<Task>(this.BASE_URL + id, task);
  }

  removeTask(id: string): Observable<Task> {
    return this.http.delete<Task>(this.BASE_URL + id);
  }
}
