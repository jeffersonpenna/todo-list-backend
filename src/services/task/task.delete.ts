import { PrismaClient } from '@prisma/client'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskDelete {
  id: string
  userId: string
}

class TaskDeleteService {
  public exec = async (taskToDelete: ITaskDelete): Promise<void> => {
    const prisma = new PrismaClient()

    const taskById: Task | null = await prisma.task.findUnique({
      where: {
        id: taskToDelete.id
      },
      include: {
        project: true
      }
    })

    if (!taskById) throw new AppError(Messages.TASK_NOT_FOUND, 400)
    if (taskById.project.userId !== taskToDelete.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    await prisma.task.delete({
      where: {
        id: taskToDelete.id
      }
    })
  }
}

export default new TaskDeleteService()
