import { Component, h } from 'preact'

import 'theme/styles/body.scss'

import Rows from 'prange/rows'

import TwitterHeader from './twitter-header'

export default class App extends Component {
  render() {
    return (
      <Rows>
        <TwitterHeader />
        <div style={{height: '1000px'}}></div>
      </Rows>
    )
  }
}
