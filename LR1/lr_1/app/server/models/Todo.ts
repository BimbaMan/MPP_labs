export type TodoStatus = "Pending" | "Completed";

export type Todo = {
  id: string;
  title: string;
  content: string;
  status: TodoStatus;
  date: Date;
  file: string;
};
