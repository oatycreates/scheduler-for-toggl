import * as React from 'react'
import * as _ from 'lodash'

// Component styles
import './DemoPage.css'

// Component imports
import {Button, ButtonStyles} from '../../components/Button'
import TextInput from '../../components/TextInput'
import ApiTokenField from '../../containers/ApiTokenField'

// Assets
const logo = require('./assets/logo.svg')

class DemoPage extends React.Component<{}, null> {
  onButtonClick(evt: React.MouseEvent<{}>) {
    alert(`onButtonClick: ${evt.clientX}, ${evt.clientY}`)
  }
  onTextInputChange(evt: React.ChangeEvent<{}>) {
    // tslint:disable-next-line:no-console
    console.log(`onTextInputChange: ${evt.timeStamp}`)
  }

  render() {
    return (
      <div className="DemoPage container">
        <div className="DemoPage-header">
          <img src={logo} className="DemoPage-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="DemoPage-intro">
          To get started, edit <code>src/components/DemoPage/DemoPage.tsx</code> and save to reload.
        </p>
        <p>
          <i className="fa fa-check" aria-hidden="true" />
        </p>
        <p>
          Lodash _.zip: {_.zip(['a', 'b', 'c'], ['1', '2', '3']).toString()}
        </p>
        <div className="row">
          <div className="col-md-6">
            div.col-md-6
          </div>
          <div className="col-md-6">
            div.col-md-6
          </div>
        </div>
        <Button
          buttonText="Disabled Button"
          disabled={true}
          onClick={this.onButtonClick}
        />
        <Button
          buttonText="Primary Button"
          buttonStyle={ButtonStyles.primary}
          onClick={this.onButtonClick}
        />
        <TextInput
          placeholder="Placeholder value!"
          onChange={this.onTextInputChange}
        />
        <ApiTokenField />
      </div>
    )
  }
}

export default DemoPage
