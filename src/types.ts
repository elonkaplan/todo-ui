export interface ITask {
  id: number;
  title: string;
  color: string | null;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
