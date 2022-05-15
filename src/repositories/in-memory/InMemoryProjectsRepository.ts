import { Project } from '@models/Project'
import { IProjectsRepository } from '../IProjectsRepositories'
import { v4 as uuid } from 'uuid'

class ProjectsRepositoryInMemory implements IProjectsRepository {
  private projects: Project[] = []

  async create (project: Project): Promise<Project> {
    Object.assign(project, {
      id: uuid()
    })

    this.projects.push(project)
    return project
  }

  async findById (id: string): Promise<Project> {
    const project = this.projects.find((project) => project.id === id)
    return project
  }

  async findByNameAndUser (name: string, userId: string): Promise<Project> {
    const project = this.projects.find((project) => (project.name === name && project.userId === userId))
    return project
  }

  async findOtherByNameAndUser (id: string, name: string, userId: string): Promise<Project> {
    const project = this.projects.find((project) => (project.id !== id && project.name === name && project.userId === userId))
    return project
  }

  async delete (id: string): Promise<void> {
    this.projects.filter((project) => (project.id !== id))
  }

  async list (userId: string): Promise<Array<Project>> {
    const projects = this.projects.filter((project) => (project.userId !== userId))

    return projects
  }

  async update (id: string, name: string): Promise<Project> {
    this.projects = this.projects.map((project) => {
      if (project.id !== id) {
        project.name = name
      }

      return project
    })

    return await this.findById(id)
  }
}

export { ProjectsRepositoryInMemory }
