import { ITasksRepository } from '@repositories/ITasksRepositories'
import { Task } from '@models/Task'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskEdit {
  id: string
  isDone: boolean
  userId: string
}

class TaskEditService {
  constructor (private tasksRepository: ITasksRepository) {}

  public exec = async (taskToEdit: ITaskEdit): Promise<Task> => {
    const taskById = await this.tasksRepository.get(taskToEdit.id)

    if (!taskById) throw new AppError(Messages.TASK_NOT_FOUND, 400)
    if (taskById.project.userId !== taskToEdit.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const task = await this.tasksRepository.update(taskToEdit.id, taskToEdit.isDone)
    return task
  }
}

export { TaskEditService }
