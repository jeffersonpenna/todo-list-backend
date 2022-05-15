import { Task } from '@models/Task'

interface ITasksRepository {
  deleteByProjectId(projectId: string): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task>;
  create(task: Task): Promise<Task>;
  get(id: string): Promise<Task>;
  update(id: string, isDone: boolean): Promise<Task>;
}

export { ITasksRepository }
