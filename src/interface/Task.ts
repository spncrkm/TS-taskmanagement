export interface Task {
  id: number | null;
  name: string;
  description: string;
  dueDate: string;
  email: string;
  priority?: string;
}

export interface TaskState {
  tasks: Task[];
}
