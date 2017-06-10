import * as React from 'react'
import ApiTokenField from '../../../containers/ApiTokenField'

export interface ApiTokenEntrySubpageProps {

}

export const ApiTokenEntrySubpage: React.StatelessComponent<ApiTokenEntrySubpageProps> = (props) => {
  return (
    <div className="ApiTokenSubpage">
      <p>Enter your Toggl API key</p>
      <ApiTokenField />
    </div>
  )
}

export default ApiTokenEntrySubpage
