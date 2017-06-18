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

/**
 * Parses the Toggl API error object and returns a structured error string.
 * @param err Error object from the Toggl API.
 */
export const formatTogglApiErrorMessage = (err: TogglClient.APIError): string => {
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
