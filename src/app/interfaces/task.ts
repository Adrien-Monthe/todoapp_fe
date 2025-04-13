export interface ITask {
  id: number;
  title?: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  UserId?: number;
}
