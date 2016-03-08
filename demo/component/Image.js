import React, { Component } from 'react'
import autobind from 'core-decorators/lib/autobind'
import Image from '../../src/image'

export default class ImageDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: 'http://www.baidu.com/img/bd_logo1.png'
    }
  }

  render() {
    return (
      <div>
        <button onClick={this._handleClick}>update</button>
        <Image src={this.state.src}/>
      </div>
    )
  }

  @autobind
  _handleClick() {
    this.setState({
      src: 'https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    })
  }
}