import { PrismaClient } from '@prisma/client'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskEdit {
  id: string
  isDone: boolean
  userId: string
}

class TaskEditService {
  public exec = async (taskToEdit: ITaskEdit): Promise<Task> => {
    const prisma = new PrismaClient()

    const taskById: Task | null = await prisma.task.findUnique({
      where: {
        id: taskToEdit.id
      },
      include: {
        project: true
      }
    })

    if (!taskById) throw new AppError(Messages.TASK_NOT_FOUND, 400)
    if (taskById.project.userId !== taskToEdit.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const task: Task = await prisma.task.update({
      data: {
        isDone: taskToEdit.isDone
      },
      where: {
        id: taskToEdit.id
      }
    })

    return task
  }
}

export default new TaskEditService()
