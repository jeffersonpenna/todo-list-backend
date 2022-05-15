import { Request, Response } from 'express'
import TaskCreateService from '@services/task/task.create'
import TaskEditService from '@services/task/task.edit'
import TaskDeleteService from '@services/task/task.delete'

class TaskController {
  public create = async (req: Request, res: Response): Promise<void> => {
    const { name, projectId } = req.body
    const userId = res.locals.token.userId

    const result = await TaskCreateService.exec({ name, projectId, userId })

    res.status(200).json(result)
  }

  public edit = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const { isDone } = req.body
    const userId = res.locals.token.userId

    const project = await TaskEditService.exec({ isDone, id, userId })

    res.status(200).json({ project })
  }

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const userId = res.locals.token.userId

    await TaskDeleteService.exec({ id, userId })

    res.status(204).json()
  }
}

export default new TaskController()
