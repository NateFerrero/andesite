import './dev.html'
import './index.html'

import { h, render } from 'preact'

import App from 'scenes/app'

window.addEventListener('load', () => {
  render(
    <App />,
    document.body
  )
})
