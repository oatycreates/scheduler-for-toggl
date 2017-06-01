import * as faker from 'faker'

class TogglClient {
  options = {
    apiToken: '',
  }

  constructor(options: { apiToken: string }) {
    this.options = options
  }

  getUserData(
      options: {} | null,
      callback: (error: {} | null, userData: {} | null) => {}) {
    if (this.options.apiToken.length > 0) {
      // API key present, pretend that the response was successful
      callback(null, { id: faker.random.number({ min: 1 }) })
    } else {
      // No API key present, pretend that the response was not successful
      callback({code: 400, errors: ['Invalid API key']}, null)
    }
  }
}

let togglClient: TogglClient | null = null
export const initTogglClient = (options: { apiToken: string }) => {
  togglClient = new TogglClient(options)
}

export const getTogglClient = () => {
  return togglClient
}
