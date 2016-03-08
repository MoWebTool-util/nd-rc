/**
 * @file Image Wrapper
 * @author lyf
 * @date 2016/3/4
 */

import React, { Component, PropTypes } from 'react'
import ReactSpinner from './spinner'
import autobind from 'core-decorators/lib/autobind'

class ImageX extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    defaultSrc: PropTypes.string,
    cache: PropTypes.bool,
    isShowSpinner: PropTypes.bool,
    Spinner: PropTypes.element,
    spinnerConfig: PropTypes.object,
    spinnerContainerClassName: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
  }

  static defaultProps = {
    cache: true,
    isShowSpinner: true
  }

  constructor(props) {
    super(props)

    this.src = props.src
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this._loadImage()
  }

  componentWillReceiveProps(nextProps) {
    const { src: oldSrc } = this.props
    const { src: newSrc, cache } = nextProps
    const isRefresh = oldSrc !== newSrc || !cache

    if (isRefresh) {
      this.setState({
        loaded: false
      })
      this.src = newSrc
    }
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      this._loadImage()
    }
  }

  render() {
    const {
      src,
      defaultSrc,
      isShowSpinner,
      Spinner,
      spinnerConfig,
      spinnerContainerClassName,
      onLoad,
      onError,
      ...other } = this.props
    const { loaded } = this.state

    if (loaded) {
      return <img src={this.src} {...other}/>
    } else {
      if (isShowSpinner) {
        if (Spinner) {
          return React.createElement(Spinner)
        } else {
          return <ReactSpinner config={spinnerConfig} containerClassName={spinnerContainerClassName} />
        }
      } else {
        return null
      }
    }
  }

  get src() {
    return this._src
  }

  set src(val) {
    const { cache } = this.props

    this._src = val

    // base64图片不加时间戳
    if (/^data:image/.test(val)) return

    if (!cache) {
      if (val.indexOf('?') !== -1) {
        this._src = `${val}&_=${Date.now()}`
      } else {
        this._src = `${val}?_=${Date.now()}`
      }
    }
  }

  @autobind
  _loadImage() {
    let image = new Image()
    image.onload = this._onLoad
    image.onerror = this._onError
    image.src = this.src
  }

  @autobind
  _onLoad() {
    const { onLoad } = this.props

    this.setState({
      loaded: true
    })
    onLoad && onLoad()
  }

  @autobind
  _onError() {
    const { onError, defaultSrc } = this.props

    if (defaultSrc) {
      this.src = defaultSrc
    }

    this.setState({
      loaded: true
    })
    onError && onError()
  }
}

export default ImageX
