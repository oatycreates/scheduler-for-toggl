// Type definitions for node-toggl-api v1.0.1
// Project: https://github.com/7eggs/node-toggl-api
// Definitions by: Patrick Ferguson <https://github.com/patferguson>

// TODO: Build typings for the node-toggl-api package and then remove this file

declare module 'toggl-api' {
  class TogglClient {
    constructor(options: TogglClient.TogglClientOptions)

    getUserData(options: {}, callback: (error: TogglClient.APIError, userData: TogglClient.UserDataResponse) => void): void
    createTimeEntry(data: TogglClient.TimeEntry, callback: (error: TogglClient.APIError, timeEntry: TogglClient.TimeEntry) => void): void
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
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md
     */
    export interface TimeEntry {
      "description": string, // (string, strongly suggested to be used)
      "wid"?: number, // workspace ID (integer, required if pid or tid not supplied)
      "pid"?: number, // project ID (integer, not required)
      "tid"?: number, // task ID (integer, not required)
      "billable"?: boolean, // (boolean, not required, default false, available for pro workspaces)
      "start": string, // time entry start time (string, required, ISO 8601 date and time)
      "stop"?: string, // time entry stop time (string, not required, ISO 8601 date and time)
      "duration": number, // time entry duration in seconds. If the time entry is currently running, the duration attribute contains a negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970). The correct duration can be calculated as current_time + duration, where current_time is the current time in seconds since epoch. (integer, required)
      "tags"?: Array<string>, // a list of tag names (array of strings, not required)
      "duronly"?: boolean, // should Toggl show the start and stop time of this time entry? (boolean, not required)
      "at"?: string, // timestamp that is sent in the response, indicates the time item was last updated
    }

    /**
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/cors.md
     */
    export interface CorsRequest {
      "domain": string,
    }

    /**
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/cors.md
     */
    export interface CorsResponse {
      "id": number,
      "domain": string,
      "user_id": number,
    }

    /**
    * Classes
    */

    export class APIError {
      /**
       * HTTP status code
       */
      code?: number
      /**
       * Keeps error or other descriptive data if errors array is not specified
       */
      data?: {}
      /**
       * List of errors
       */
      errors?: string[]
      /**
       * RequestJS error, this will be set ONLY if the request itself failed to
       * reach the Toggl server e.g. during maintenance.
       */
      message?: string
    }
  }

  export = TogglClient
}

