import { Action as ReduxAction } from 'redux'

/**
 * Describes an action that may contain a particular pre-specified payload shape.
 */
export interface Action<Payload> extends ReduxAction {
  type: string,
  payload: Payload,
}

/**
 * Allows for an action creator to be generated that matches the input type and
 * payload shape.
 */
export interface ActionCreator<P> {
  type: string,
  (payload: P): Action<P>,
}

/**
 * Generates an action with payload matching the input payload shape P.
 * @type P Payload data type signature.
 * @param type Name of the action e.g. 'SUBMIT_API_KEY'
 */
export function actionCreator<P>(type: string): ActionCreator<P> {
  return Object.assign(
    (payload: P): Action<P> => ({type, payload}),
    {type},
  )
}

/**
 * Type guards
 */

/**
 * Checks whether the input action matches the input type name. If so, it will
 * be typecast to that action.
 * @type P Payload data type signature.
 * @param action Action to test.
 * @param actionCreator Action creator matching the desired type to test for.
 */
export function isType<P>(
    action: ReduxAction, actionCreator: ActionCreator<P>): action is Action<P> {
  return action.type === actionCreator.type
}
