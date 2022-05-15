import { PrismaClient } from '@prisma/client'

import Messages from '@constants/messages'
import AppError from '@config/appError'

interface IProjectNew {
  name: string
  userId: string
}

class ProjectCreateService {
  public exec = async (projectToCreate: IProjectNew): Promise<Project> => {
    const prisma = new PrismaClient()

    const projectByName: Project | null = await prisma.project.findFirst({
      where: {
        name: projectToCreate.name,
        userId: projectToCreate.userId
      }
    })

    if (projectByName) throw new AppError(Messages.PROJECT_ALREADY_EXISTS, 409)

    const project = await prisma.project.create({
      data: {
        name: projectToCreate.name,
        user: {
          connect: {
            id: projectToCreate.userId
          }
        }
      }
    })

    return project
  }
}

export default new ProjectCreateService()
