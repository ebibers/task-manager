export interface Task {
  id?: string;
  title: string;
  description: string;
  type: string;
  createdOn: Date | string;
  status: boolean;
}