import { PrismaClient } from '@prisma/client'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface IProjectDelete {
  id: string
  userId: string
}

class ProjectDeleteService {
  public exec = async (projectToDelete: IProjectDelete): Promise<void> => {
    const prisma = new PrismaClient()

    const projectById: Project | null = await prisma.project.findUnique({
      where: {
        id: projectToDelete.id
      }
    })

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== projectToDelete.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    await prisma.task.deleteMany({
      where: {
        projectId: projectToDelete.id
      }
    })

    await prisma.project.delete({
      where: {
        id: projectToDelete.id
      }
    })
  }
}

export default new ProjectDeleteService()
