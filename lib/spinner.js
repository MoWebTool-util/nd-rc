'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spin = require('spin.js');

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactSpinner = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ReactSpinner, _React$Component);

  function ReactSpinner() {
    (0, _classCallCheck3.default)(this, ReactSpinner);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ReactSpinner).apply(this, arguments));
  }

  (0, _createClass3.default)(ReactSpinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var color = _props.color;
      var config = _props.config;

      var spinConfig = (0, _extends3.default)({
        // a few sensible defaults
        width: 5,
        radius: 10,
        length: 0,
        color: color
      }, config);

      this.spinner = new _spin2.default(spinConfig);
      this.spinner.spin(this.refs.container);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.spinner.stop();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var containerWidth = _props2.containerWidth;
      var containerHeight = _props2.containerHeight;


      var styles = {
        position: 'relative',
        display: 'inline-block',
        width: containerWidth,
        height: containerHeight
      };

      return _react2.default.createElement('span', {
        ref: 'container',
        className: this.props.containerClassName,
        style: styles });
    }
  }]);
  return ReactSpinner;
}(_react2.default.Component), _class.propTypes = {
  // see `http://fgnass.github.io/spin.js` for all options
  config: _react.PropTypes.object,
  color: _react.PropTypes.string.isRequired,
  containerClassName: _react.PropTypes.string,
  containerWidth: _react.PropTypes.string,
  containerHeight: _react.PropTypes.string
}, _class.defaultProps = {
  config: {},
  color: 'black'
}, _temp);
exports.default = ReactSpinner;
module.exports = exports['default'];