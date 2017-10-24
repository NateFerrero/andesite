import { Component, h } from 'preact'

import 'theme/styles/header.scss'

import Anchor from 'prange/anchor'
import Columns from 'prange/columns'
import Constrain from 'prange/constrain'
import Fixed from 'prange/fixed'
import Rows from 'prange/rows'
import ScrollCollapse from 'prange/scroll-collapse'

export default class App extends Component {
  render() {
    return (
      <Fixed top>
        <Rows>
          <ScrollCollapse height min={80} max={210} class='header'>
            <Constrain width max={1195}>
              <Anchor top left class='header-section'>
                <label>Twitter</label>
              </Anchor>
              <Anchor middle center>
                <h1>What's happening?</h1>
              </Anchor>
              <Anchor top right class='header-section'>
                <Columns>
                  <button>Sign up</button>
                  <button>Log in</button>
                </Columns>
              </Anchor>
            </Constrain>
          </ScrollCollapse>
          <Columns>

          </Columns>
        </Rows>
      </Fixed>
    )
  }
}
