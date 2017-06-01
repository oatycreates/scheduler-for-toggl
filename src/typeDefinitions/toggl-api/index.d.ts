// Type definitions for node-toggl-api v1.0.1
// Project: https://github.com/7eggs/node-toggl-api
// Definitions by: Patrick Ferguson <https://github.com/patferguson>

// TODO: Build typings for the node-toggl-api package and then remove this file

declare module 'toggl-api' {
  class TogglClient {
    constructor(options: TogglClient.TogglClientOptions)

    getUserData(options: {}, callback: (error: TogglClient.APIError, userData: {}) => void): void
  }

  namespace TogglClient {
    /**
     * Method options
     */
    export interface TogglClientOptions {
      apiToken?: string,
    }

    /**
     * Callback data structures
     */

    /**
     * Properties within the 'data' field are used.
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#get-current-user-data
    */
    export interface UserDataResponse {
      "id": number,
      "api_token": string,
      "default_wid": number,
      "email": string,
      "fullname": string,
      "jquery_timeofday_format": string,
      "jquery_date_format": string,
      "timeofday_format": string,
      "date_format": string,
      "store_start_and_stop_time": boolean,
      "beginning_of_week": number,
      "language": string,
      "image_url": string,
      "sidebar_piechart": boolean,
      "at": string,
      "retention": number,
      "record_timeline": boolean,
      "render_timeline": boolean,
      "timeline_enabled": boolean,
      "timeline_experiment": boolean,
      "new_blog_post": {},
      "invitation": {},
    }

    /**
    * Classes
    */

    export class APIError {
      /**
       * HTTP status code
       */
      code: number
      /**
       * Keeps error or other descriptive data if errors array is not specified
       */
      data?: {}
      /**
       * List of errors
       */
      errors?: string[]
    }
  }

  export = TogglClient
}

