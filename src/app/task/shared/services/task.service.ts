import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private subject = new Subject();

  constructor(private http: HttpClient) {}

  emit(eventName : string, payload : any) {
    this.subject.next({eventName, payload});
  }

  listen(eventName : string, callback : (event : any) => void) {
    this.subject.asObservable().subscribe((obj : any) => {
      if (eventName === obj.eventName) {
        callback(obj.payload);
      }
    });
  }

  getTasks() {
    return this.http.get('assets/tasks.json');
  }

  removeTask(index : any, taskList : Task[]) {
    taskList.splice(index, 1);
    return taskList;
  }
}
