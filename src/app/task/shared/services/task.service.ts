import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  BASE_URL = 'http://localhost:3000/api/tasks/';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.BASE_URL}get-all-tasks`);
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}get-task/${id}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(`${this.BASE_URL}create-task`, task);
  }

  updateTask(id: string, task: Task): Observable<any> {
    return this.http.patch(`${this.BASE_URL}update-task/${id}`, task);
  }

  removeTask(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete-task/${id}`);
  }
}
