import * as React from 'react'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import ApiTokenEntrySubpage from './subpages/ApiTokenEntrySubpage'
import ScheduleEntrySubpage from './subpages/ScheduleEntrySubpage'

import './ScheduleEntryPage.css'

/**
 * Prop type definitions
 */

export interface ScheduleEntryPageStateProps {
  apiToken?: string,
  isApiTokenValid?: boolean,
}

class ScheduleEntryPage extends React.Component<ScheduleEntryPageStateProps, {}> {
  render() {
    const hasValidApiToken = (
      this.props.apiToken &&
      this.props.isApiTokenValid &&
      this.props.apiToken.length > 0
    )

    return (
      <div className="ScheduleEntryPage container">
        {hasValidApiToken ? <ScheduleEntrySubpage /> : <ApiTokenEntrySubpage />}
      </div>
    )
  }
}

/**
 * Redux bindings
 */

/**
 * Makes the desired properties from state available on this.props for the class.
 * @param state Full store state tree.
 */
const mapStateToProps = (state: SchedulerForTogglAppState): ScheduleEntryPageStateProps => {
  // Extract the desired properties out of the state tree
  const { apiToken } = state
  return {
    apiToken: apiToken.apiToken,
    isApiTokenValid: apiToken.isValid,
  }
}

const EnhancedScheduleEntryPage = connect(
  mapStateToProps,
)(ScheduleEntryPage)

export default EnhancedScheduleEntryPage
