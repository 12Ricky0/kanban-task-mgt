export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  // description: string;
  // status: string;
  //   id: string;
  subtasks: Subtask[];
}
export interface Tasks {
  // name: string;
  name: string[];
}
