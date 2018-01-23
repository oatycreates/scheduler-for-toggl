import * as faker from 'faker'
import { Project } from '../../reducers/projects'

export function generateRandomProject(
    id: number | null,
    workspaceId: number | null,
    overrideData?: Partial<Project>): Project {
  let newProject = {
    wid: workspaceId ? workspaceId : faker.random.number(),
    name: faker.lorem.sentence(),
    color: faker.random.number({ min: 0, max: 14 }).toString(),
  } as Project

  // Allow for some tests not explicitly not define the ID for the project
  if (id !== null) {
    newProject.id = id
  }

  // Apply any existing overrides
  return Object.assign(newProject, overrideData)
}
