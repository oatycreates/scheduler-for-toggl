import * as faker from 'faker'
import { APIError, TimeEntry, Project } from 'toggl-api'
import { generateRandomProject } from '../../lib/testHelpers/project'

class TogglClient {
  options = {
    apiToken: '',
  }

  constructor(options: { apiToken: string }) {
    this.options = options
  }

  getUserData(
    options: {} | null,
    callback: (error: {} | null, userData: {} | null) => void,
  ) {
    if (this.options.apiToken.length > 0) {
      // API key present, pretend that the response was successful
      callback(null, {
        id: 0,
        defaultWorkspaceId: 0,
      })
    } else {
      // No API key present, pretend that the response was not successful
      callback({code: 400, errors: ['Invalid API key']}, null)
    }
  }

  createTimeEntry(
    data: TimeEntry,
    callback: (err: {} | null, timeEntry: TimeEntry | null) => void,
  ) {
    // Always pretend that the submit succeeded
    callback(null, {
      description: data.description,
      start: data.start,
      stop: data.stop,
      duration: data.duration,
    } as TimeEntry)
  }

  getWorkspaceProjects(
    wid: number,
    options: {},
    callback: (error: {} | null, projects: Array<Project>) => void,
  ) {
    // Always pretend that the fetch succeeded
    callback(null, [
      generateRandomProject(faker.random.number(), wid),
    ])
  }

  getProjectData(
    wid: number,
    options: {},
    callback: (error: {} | null, project: Project) => void,
  ) {
    // Always pretend that the fetch succeeded
    callback(
      null,
      generateRandomProject(faker.random.number(), wid),
    )
  }
}

let togglClient: TogglClient | null = null
export const initTogglClient = (options: { apiToken: string }) => {
  togglClient = new TogglClient(options)
}

export const getTogglClient = () => {
  return togglClient
}

export const formatTogglApiErrorMessage = (err: APIError) => {
  let errorMessage = ''
  if (err.code) {
    // Toggl API responded with an error
    errorMessage = err.code.toString()
  } else if (err.message) {
    // HTTP request to Toggl API failed
    errorMessage = err.message
  }

  if (err.errors && err.errors.length > 0) {
    errorMessage += `: ${err.errors.join(', ')}`
  }

  return errorMessage
}
