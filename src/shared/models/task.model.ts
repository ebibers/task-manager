export class Task {
  title: string;
  description: string;
  type: string;
  createdOn: Date;
  status: boolean;

  constructor(title: any, description: any, type: any) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.createdOn = new Date();
    this.status = false;
  }
}