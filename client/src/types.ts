export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export type Filter = "all" | "completed" | "not completed";
