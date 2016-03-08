/**
 * @file UC Avatar
 * @author lyf
 * @date 2016/3/7
 */

import React, { Component, PropTypes } from 'react'
import Image from '../image'
import { AVATAR_URL } from '../utils/env'

class Avatar extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    realm: PropTypes.string,
    size: PropTypes.number,
    defaultSrc: PropTypes.string
  }

  static defaultProps = {
    size: 80
  }

  render() {
    const { uid, realm, size, ...other } = this.props
    const src = `${AVATAR_URL}/${uid}/${realm ? realm + '/' : ''}${uid}.jpg?size=${size}`

    return <Image src={src} {...other} />
  }
}

export default Avatar
