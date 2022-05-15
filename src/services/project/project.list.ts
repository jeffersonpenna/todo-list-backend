import { PrismaClient } from '@prisma/client'

class ProjectListService {
  public exec = async (userId: string): Promise<Array<Project>> => {
    const prisma = new PrismaClient()

    const projects: Project[] = await prisma.project.findMany({
      where: {
        userId
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ],
      include: {
        tasks: true
      }
    })

    return projects
  }
}

export default new ProjectListService()
