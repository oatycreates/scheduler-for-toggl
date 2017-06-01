import * as TogglClient from 'toggl-api'

let togglClientInstance: TogglClient | null = null
/**
 * Initialises the ToggleClient singleton instance with the provided options.
 * @param options Options to configure the Toggl API Client.
 *   See: https://7eggs.github.io/node-toggl-api/TogglClient.html
 */
export const initTogglClient = (options: TogglClient.TogglClientOptions) => {
  if (!togglClientInstance) {
    togglClientInstance = new TogglClient(options)
  }
  return togglClientInstance
}

// All scripts that import and utilise this getter will be using the same instance
export const getTogglClient = () => {
  if (!togglClientInstance) {
    throw Error('TogglClient hasn\'t been initialised before getTogglClient() call!')
  }

  return togglClientInstance
}
