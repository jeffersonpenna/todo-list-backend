import { Request, Response } from 'express'
import { PrismaProjectsRepository } from '@repositories/prisma/PrismaProjectsRepository'
import { PrismaTasksRepository } from '@repositories/prisma/PrismaTasksRepository'

import { ProjectCreateService } from '@services/project/project.create'
import { ProjectListService } from '@services/project/project.list'
import { ProjectEditService } from '@services/project/project.edit'
import { ProjectDeleteService } from '@services/project/project.delete'

class ProjectController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body
    const userId = res.locals.token.userId

    const ProjectsRepository = new PrismaProjectsRepository()
    const projectCreateService = new ProjectCreateService(ProjectsRepository)

    const result = await projectCreateService.exec({ name, userId })

    res.status(200).json(result)
  }

  public list = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.token.userId

    const ProjectsRepository = new PrismaProjectsRepository()
    const projectListService = new ProjectListService(ProjectsRepository)

    const projects = await projectListService.exec(userId)

    res.status(200).json({ projects })
  }

  public edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const { name } = req.body
    const userId = res.locals.token.userId

    const ProjectsRepository = new PrismaProjectsRepository()
    const projectEditService = new ProjectEditService(ProjectsRepository)

    const project = await projectEditService.exec({ name, id, userId })

    res.status(200).json({ project })
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const userId = res.locals.token.userId

    const ProjectsRepository = new PrismaProjectsRepository()
    const TasksRepository = new PrismaTasksRepository()

    const projectDeleteService = new ProjectDeleteService(ProjectsRepository, TasksRepository)

    await projectDeleteService.exec({ id, userId })

    res.status(204).json()
  }
}

export default new ProjectController()
