import { PrismaClient } from '@prisma/client'
import Messages from '../../constants/messages'
import AppError from '../../errors/appError'

interface IProjectEdit {
  id: string
  name: string
  userId: string
}

class ProjectEditService {
  public exec = async (projectToEdit: IProjectEdit): Promise<Project> => {
    const prisma = new PrismaClient()

    const projectById: Project | null = await prisma.project.findFirst({
      where: {
        id: projectToEdit.id
      }
    })

    if (!projectById) throw new AppError(Messages.PROJECT_NOT_FOUND, 400)
    if (projectById.userId !== projectToEdit.userId) throw new AppError(Messages.INVALID_PERMISSION, 403)

    const projectByName: Project | null = await prisma.project.findFirst({
      where: {
        name: projectToEdit.name,
        userId: projectToEdit.userId,
        id: {
          notIn: [projectToEdit.id]
        }
      }
    })

    if (projectByName) throw new AppError(Messages.PROJECT_ALREADY_EXISTS, 409)

    const project: Project = await prisma.project.update({
      data: {
        name: projectToEdit.name
      },
      where: {
        id: projectToEdit.id
      }
    })

    return project
  }
}

export default new ProjectEditService()
