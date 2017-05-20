import * as React from 'react'
import * as _ from 'lodash'

import './DemoPage.css'

const logo = require('../assets/logo.svg')

class DemoPage extends React.Component<{}, null> {
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
      </div>
    )
  }
}

export default DemoPage
