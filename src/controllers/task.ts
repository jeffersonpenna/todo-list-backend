import { Request, Response } from 'express'

import { PrismaProjectsRepository } from '@repositories/prisma/PrismaProjectsRepository'
import { PrismaTasksRepository } from '@repositories/prisma/PrismaTasksRepository'

import { TaskCreateService } from '@services/task/task.create'
import { TaskEditService } from '@services/task/task.edit'
import { TaskDeleteService } from '@services/task/task.delete'

class TaskController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, projectId } = req.body
    const userId = res.locals.token.userId

    const ProjectsRepository = new PrismaProjectsRepository()
    const TasksRepository = new PrismaTasksRepository()

    const taskCreateService = new TaskCreateService(ProjectsRepository, TasksRepository)

    const result = await taskCreateService.exec({ name, projectId, userId })

    res.status(200).json(result)
  }

  public edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const { isDone } = req.body
    const userId = res.locals.token.userId

    const TasksRepository = new PrismaTasksRepository()
    const taskEditService = new TaskEditService(TasksRepository)

    const project = await taskEditService.exec({ isDone, id, userId })

    res.status(200).json({ project })
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const userId = res.locals.token.userId

    const TasksRepository = new PrismaTasksRepository()
    const taskDeleteService = new TaskDeleteService(TasksRepository)

    await taskDeleteService.exec({ id, userId })

    res.status(204).json()
  }
}

export default new TaskController()
