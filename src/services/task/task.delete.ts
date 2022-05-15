import { ITasksRepository } from '@repositories/ITasksRepositories'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskDelete {
  id: string
  userId: string
}

class TaskDeleteService {
  constructor (private tasksRepository: ITasksRepository) {}

  public exec = async (taskToDelete: ITaskDelete): Promise<void> => {
    const taskById = await this.tasksRepository.get(taskToDelete.id)

    if (!taskById) throw new AppError(Messages.TASK_NOT_FOUND, 400)
    if (taskById.project.userId !== taskToDelete.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    await this.tasksRepository.delete(taskToDelete.id)
  }
}

export { TaskDeleteService }
