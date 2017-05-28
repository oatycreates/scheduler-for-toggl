import * as TogglClient from 'toggl-api'

let togglClientInitialised: boolean = false
let togglClientInstance: TogglClient
/**
 * Initialises the ToggleClient singleton instance with the provided options.
 * @param options Options to configure the Toggl API Client.
 *   See: https://7eggs.github.io/node-toggl-api/TogglClient.html
 */
export const initTogglClient = (options: TogglClient.TogglClientOptions) => {
  togglClientInstance = new TogglClient(options)
  togglClientInitialised = true
}

// All scripts that import and utilise this getter will be using the same instance
export const getTogglClient = () => {
  if (!togglClientInitialised) {
    throw Error('TogglClient hasn\'t been initialised before getTogglClient() call!')
  }

  return togglClientInstance
}
