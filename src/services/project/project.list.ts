import { PrismaClient } from '@prisma/client'

class ProjectListService {
  public exec = async (userId: string): Promise<Array<Project>> => {
    const prisma = new PrismaClient()

    const projects: Array<Project> = await prisma.project.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        name: true
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    })

    return projects
  }
}

export default new ProjectListService()
