import { Task } from '@models/Task'
import { ITasksRepository } from '../ITasksRepositories'
import { ProjectsRepositoryInMemory } from './InMemoryProjectsRepository'
import { v4 as uuid } from 'uuid'

class TasksRepositoryInMemory implements ITasksRepository {
  private tasks: Task[] = []

  async create (task: Task): Promise<Task> {
    Object.assign(task, {
      id: uuid()
    })

    this.tasks.push(task)
    return task
  }

  async findById (id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id)
    return task
  }

  async delete (id: string): Promise<void> {
    this.tasks.filter((task) => (task.id !== id))
  }

  async deleteByProjectId (projectId: string): Promise<void> {
    this.tasks.filter((task) => (task.projectId !== projectId))
  }

  async update (id: string, isDone: boolean): Promise<Task> {
    this.tasks = this.tasks.map((task) => {
      if (task.id !== id) {
        task.isDone = isDone
      }

      return task
    })

    return await this.findById(id)
  }

  async get (id: string): Promise<Task> {
    const projectsRepositoryInMemory = new ProjectsRepositoryInMemory()
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.project = await projectsRepositoryInMemory.findById(task.projectId)
    }
    return task
  }
}

export { TasksRepositoryInMemory }
