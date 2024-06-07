export class Task {
  id: string | undefined;
  title: string;
  description: string;
  type: string;
  createdOn: Date | string;
  status: boolean;

  constructor(title: string, description: string, type: string) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.createdOn = new Date();
    this.status = false;
  }
}