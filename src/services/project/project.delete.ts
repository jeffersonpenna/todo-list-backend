import { PrismaClient } from '@prisma/client'
import Messages from '../../constants/messages'
import AppError from '../../errors/appError'

interface IProjectDelete {
  id: string
  userId: string
}

class ProjectEditService {
  public exec = async (projectToDelete: IProjectDelete): Promise<void> => {
    const prisma = new PrismaClient()

    const projectById: Project | null = await prisma.project.findFirst({
      where: {
        id: projectToDelete.id
      }
    })

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== projectToDelete.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    await prisma.project.delete({
      where: {
        id: projectToDelete.id
      }
    })
  }
}

export default new ProjectEditService()
