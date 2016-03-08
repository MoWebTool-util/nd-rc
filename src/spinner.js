import React, {PropTypes} from 'react'
import Spinner from 'spin.js'

export default class ReactSpinner extends React.Component {
  static propTypes = {
    // see `http://fgnass.github.io/spin.js` for all options
    config: PropTypes.object,
    color: PropTypes.string.isRequired,
    containerClassName: PropTypes.string
  }

  static defaultProps = {
    config: {},
    color: 'black',
    containerClassName: ''
  }

  componentDidMount() {
    const {color, config} = this.props
    const spinConfig = {
      // a few sensible defaults
      width: 5,
      radius: 10,
      length: 0,
      color,
      ...config
    }

    this.spinner = new Spinner(spinConfig)
    this.spinner.spin(this.refs.container)
  }

  componentWillUnmount() {
    this.spinner.stop()
  }

  render() {
    return (
      <span
        ref="container"
        className={this.props.containerClassName}
        style={{position: 'relative'}}
      />
    )
  }
}
