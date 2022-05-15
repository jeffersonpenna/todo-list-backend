import { IProjectsRepository } from '@repositories/IProjectsRepositories'
import { ITasksRepository } from '@repositories/ITasksRepositories'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface IProjectDelete {
  id: string
  userId: string
}

class ProjectDeleteService {
  constructor (private projectsRepository: IProjectsRepository, private tasksRepository: ITasksRepository) {}

  public exec = async (projectToDelete: IProjectDelete): Promise<void> => {
    const projectById = await this.projectsRepository.findById(projectToDelete.id)

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== projectToDelete.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    await this.tasksRepository.deleteByProjectId(projectToDelete.id)

    await this.projectsRepository.delete(projectToDelete.id)
  }
}

export { ProjectDeleteService }
