import { IProjectsRepository } from '@repositories/IProjectsRepositories'
import { Project } from '@models/Project'

class ProjectListService {
  constructor (private projectsRepository: IProjectsRepository) {}

  public exec = async (userId: string): Promise<Array<Project>> => {
    const projects = await this.projectsRepository.list(userId)
    return projects
  }
}

export { ProjectListService }
