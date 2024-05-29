import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList : Task[] = new Array();

  constructor(private http: HttpClient) {
    this.http.get('assets/tasks.json').subscribe((data : any) => {
      this.taskList = data;
    });
  }

  getAllTasks() {
    return this.taskList;
  }

  getTask(index : any) : any {
    return this.taskList[index];
  }

  createTask(task : any) {
    this.taskList.push(task);
  }

  toggleComplete(index : any) {
    this.taskList[index].status = !this.taskList[index].status;
  }

  removeTask(index : any) {
    this.taskList.splice(index, 1);
  }
}
