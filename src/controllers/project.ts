import { Request, Response } from 'express'
import ProjectCreateService from '@services/project/project.create'
import ProjectListService from '@services/project/project.list'
import ProjectEditService from '@services/project/project.edit'
import ProjectDeleteService from '@services/project/project.delete'

class ProjectController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body
    const userId = res.locals.token.userId

    const result = await ProjectCreateService.exec({ name, userId })

    res.status(200).json(result)
  }

  public list = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.token.userId

    const projects = await ProjectListService.exec(userId)

    res.status(200).json({ projects })
  }

  public edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const { name } = req.body
    const userId = res.locals.token.userId

    const project = await ProjectEditService.exec({ name, id, userId })

    res.status(200).json({ project })
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const userId = res.locals.token.userId

    await ProjectDeleteService.exec({ id, userId })

    res.status(204).json()
  }
}

export default new ProjectController()
