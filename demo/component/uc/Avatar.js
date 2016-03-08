import React, { Component } from 'react'
import Avatar from 'src/uc/avatar'
import LinkedStateMixin from 'react-addons-linked-state-mixin'
import mixin from 'core-decorators/lib/mixin'
import styles from '../../styles/avatar'

@mixin(LinkedStateMixin)
export default class AvatarDemo extends Component {
  constructor() {
    super()
    this.state = {
      uid: '777'
    }
  }

  render() {
    const defaultSrc = require('../../assets/default-avatar.png')
    return (
      <div>
        <div>
          工号：<input type="text" valueLink={this.linkState('uid')}/>
        </div>
        <br />
        <Avatar
          uid={this.state.uid}
          defaultSrc={defaultSrc}
          spinnerContainerClassName={styles['spin-container']}/>
      </div>
    )
  }
}