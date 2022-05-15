import { prisma } from '@config/database'
import { Project } from '@models/Project'
import { IProjectsRepository } from '../IProjectsRepositories'

class PrismaProjectsRepository implements IProjectsRepository {
  async create (project: Project): Promise<Project> {
    const result = await prisma.project.create({
      data: {
        name: project.name,
        user: {
          connect: {
            id: project.userId
          }
        }
      }
    })

    return result
  }

  async findByNameAndUser (name: string, userId: string): Promise<Project> {
    const project = await prisma.project.findFirst({
      where: {
        name,
        userId
      }
    })

    return project
  }

  async findById (id: string): Promise<Project> {
    const project = await prisma.project.findUnique({
      where: { id }
    })

    return project
  }

  async delete (id: string): Promise<void> {
    await prisma.project.delete({
      where: { id }
    })
  }

  async findOtherByNameAndUser (id: string, name: string, userId: string): Promise<Project> {
    const project = await prisma.project.findFirst({
      where: {
        name,
        userId,
        id: {
          notIn: [id]
        }
      }
    })

    return project
  }

  async update (id: string, name: string): Promise<Project> {
    const project = await prisma.project.update({
      data: {
        name
      },
      where: {
        id
      }
    })

    return project
  }

  async list (userId: string): Promise<Array<Project>> {
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

export { PrismaProjectsRepository }
