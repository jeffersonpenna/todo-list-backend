import { IProjectsRepository } from '@repositories/IProjectsRepositories'
import { Project } from '@models/Project'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface IProjectNew {
  name: string
  userId: string
}

class ProjectCreateService {
  constructor (private projectsRepository: IProjectsRepository) {}

  public exec = async (projectToCreate: IProjectNew): Promise<Project> => {
    const projectByName = await this.projectsRepository.findByNameAndUser(projectToCreate.name, projectToCreate.userId)

    if (projectByName) throw new AppError(Messages.PROJECT_ALREADY_EXISTS, 409)

    const newProject = Project.create({
      name: projectToCreate.name,
      userId: projectToCreate.userId
    })

    const project = await this.projectsRepository.create(newProject)

    return project
  }
}

export { ProjectCreateService }
