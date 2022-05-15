import { PrismaClient } from '@prisma/client'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface ITaskNew {
  name: string
  projectId: string
  userId: string
}

class ProjectCreateService {
  public exec = async (taskToCreate: ITaskNew): Promise<Task> => {
    const prisma = new PrismaClient()

    const projectById: Project | null = await prisma.project.findUnique({
      where: {
        id: taskToCreate.projectId
      }
    })

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== taskToCreate.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const task = await prisma.task.create({
      data: {
        name: taskToCreate.name,
        project: {
          connect: {
            id: taskToCreate.projectId
          }
        }
      }
    })

    return task
  }
}

export default new ProjectCreateService()
