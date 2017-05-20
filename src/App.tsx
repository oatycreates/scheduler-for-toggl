import * as React from 'react'
import * as _ from 'lodash'

import './App.css'

const logo = require('./logo.svg')

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          <i className="fa fa-check" aria-hidden="true" />
        </p>
        <p>
          Lodash _.zip: {_.zip(['a', 'b', 'c'], ['1', '2', '3']).toString()}
        </p>
      </div>
    )
  }
}

export default App
