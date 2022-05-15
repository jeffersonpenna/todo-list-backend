import { Project } from '@models/Project'

interface IProjectsRepository {
  create(project: Project): Promise<Project>;
  findByNameAndUser(name: string, userId: string): Promise<Project>;
  findById(id: string): Promise<Project>;
  delete(id: string): Promise<void>;
  findOtherByNameAndUser(id: string, name: string, userId: string): Promise<Project>;
  update(id: string, name: string): Promise<Project>;
  list(userId: string): Promise<Array<Project>>;
}

export { IProjectsRepository }
