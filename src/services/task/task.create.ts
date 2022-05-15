import { ITasksRepository } from '@repositories/ITasksRepositories'
import { IProjectsRepository } from '@repositories/IProjectsRepositories'
import { Task } from '@models/Task'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskNew {
  name: string
  projectId: string
  userId: string
}

class TaskCreateService {
  constructor (private projectsRepository: IProjectsRepository, private tasksRepository: ITasksRepository) {}

  public exec = async (taskToCreate: ITaskNew): Promise<Task> => {
    const projectById = await this.projectsRepository.findById(taskToCreate.projectId)

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== taskToCreate.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const newTask = Task.create({
      name: taskToCreate.name,
      projectId: taskToCreate.projectId
    })

    const task = await this.tasksRepository.create(newTask)

    return task
  }
}

export { TaskCreateService }
