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
 * Applications that require CORS access must be first whitelisted for a user.
 * See:
 * * https://github.com/toggl/toggl_api_docs/commit/db9544c160595a55b5c0148881ebb4b695c5c2cd
 * * https://github.com/toggl/toggl_api_docs/blob/master/chapters/cors.md
 */
export const ensureCorsIsWhitelisted = (apiToken: string) => {
  /**
   * NOTE: 2017/06/21 - The node-toggl-api doesn't yet include support for the
   *   CORS request type. Manually perform the API request for now.
   */

  // See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/authentication.md
  const authBase64 = btoa(`${apiToken}:apitoken`)
  const requestOptions = {
    headers: {
      'Authorization': `Basic ${authBase64}`,
    },
  }
  fetch('https://www.toggl.com/api/v9/me/cors', requestOptions)
    .then(function(response: Response) {
      return response.json()
    })
    .then(function(json: TogglClient.CorsResponse) {
      debugger;
      console.log('parsed json', json)
    })
    .catch(function(ex: Error) {
      debugger;
      console.log('parsing failed', ex)
    })

  // WIP Code to post the CORS request, ensure it doesn't exist first
  // const corsGetRequest = new Request(
  //   'https://www.toggl.com/api/v9/me/cors',
  //   {
  //     method: 'POST',
  //     // TODO: Get domain from package.json 'homepage' key, might need to use uri.js to grab the domain out
  //     body: { domain: 'TODO' } as TogglClient.CorsRequest,
  //   },
  // )
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
