import { IProjectsRepository } from '@repositories/IProjectsRepositories'
import { Project } from '@models/Project'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface IProjectEdit {
  id: string
  name: string
  userId: string
}

class ProjectEditService {
  constructor (private projectsRepository: IProjectsRepository) {}

  public exec = async (projectToEdit: IProjectEdit): Promise<Project> => {
    const projectById = await this.projectsRepository.findById(projectToEdit.id)

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== projectToEdit.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const projectByName = await this.projectsRepository.findOtherByNameAndUser(projectToEdit.id, projectToEdit.name, projectToEdit.userId)

    if (projectByName) throw new AppError(Messages.PROJECT_ALREADY_EXISTS, 409)

    const project = await this.projectsRepository.update(projectToEdit.id, projectToEdit.name)

    return project
  }
}

export { ProjectEditService }
