import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

/**
 * Bootstrap jQuery plugin bindings:
 *
 * Note that React components based on Bootstrap JavaScript ones will have to
 * bind using the Bootstrap jQuery plugins in componentDidMount as they won't
 * exist on page load.
 */
import 'jquery'
import 'bootstrap/dist/js/bootstrap.js'

// Site styles
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
)
