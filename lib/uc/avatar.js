'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _class, _temp; /**
                    * @file UC Avatar
                    * @author lyf
                    * @date 2016/3/7
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

var _env = require('../utils/env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Avatar, _Component);

  function Avatar() {
    (0, _classCallCheck3.default)(this, Avatar);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Avatar).apply(this, arguments));
  }

  (0, _createClass3.default)(Avatar, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var uid = _props.uid;
      var realm = _props.realm;
      var size = _props.size;
      var other = (0, _objectWithoutProperties3.default)(_props, ['uid', 'realm', 'size']);

      var src = _env.AVATAR_URL + '/' + uid + '/' + (realm ? realm + '/' : '') + uid + '.jpg?size=' + size;

      return _react2.default.createElement(_image2.default, (0, _extends3.default)({ src: src }, other));
    }
  }]);
  return Avatar;
}(_react.Component), _class.propTypes = {
  uid: _react.PropTypes.string.isRequired,
  realm: _react.PropTypes.string,
  size: _react.PropTypes.number,
  defaultSrc: _react.PropTypes.string
}, _class.defaultProps = {
  size: 80
}, _temp);
exports.default = Avatar;
module.exports = exports['default'];