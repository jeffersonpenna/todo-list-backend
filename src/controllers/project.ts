import { Request, Response } from 'express'
import ProjectService from '@services/project/project.create'

class ProjectController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body
    const userId = res.locals.token.userId

    const result = await ProjectService.exec({ name, userId })

    res.status(200).json(result)
  }
}

export default new ProjectController()
