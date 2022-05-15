import { prisma } from '@config/database'
import { Task } from '@models/Task'
import { ITasksRepository } from '../ITasksRepositories'

class PrismaTasksRepository implements ITasksRepository {
  async create (task: Task): Promise<Task> {
    const result = await prisma.task.create({
      data: {
        name: task.name,
        project: {
          connect: {
            id: task.projectId
          }
        }
      }
    })

    return result
  }

  async get (id: string): Promise<Task> {
    const result = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true
      }
    })

    return result
  }

  async delete (id: string): Promise<void> {
    await prisma.task.delete({
      where: { id }
    })
  }

  async deleteByProjectId (projectId: string): Promise<void> {
    await prisma.task.deleteMany({
      where: { projectId }
    })
  }

  async findById (id: string): Promise<Task> {
    const result = await prisma.task.findUnique({
      where: { id }
    })

    return result
  }

  async update (id: string, isDone: boolean): Promise<Task> {
    const task = await prisma.task.update({
      data: { isDone },
      where: { id }
    })

    return task
  }
}

export { PrismaTasksRepository }
