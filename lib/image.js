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
                    * @file Image Wrapper
                    * @author lyf
                    * @date 2016/3/4
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spinner = require('./spinner');

var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageX = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ImageX, _Component);

  function ImageX(props) {
    (0, _classCallCheck3.default)(this, ImageX);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ImageX).call(this, props));

    _this.src = props.src;
    _this.state = {
      loaded: false
    };
    return _this;
  }

  (0, _createClass3.default)(ImageX, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var isShowSpinner = this.props.isShowSpinner;

      isShowSpinner && this._loadImage();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var oldSrc = this.props.src;
      var newSrc = nextProps.src;
      var cache = nextProps.cache;

      var isRefresh = oldSrc !== newSrc || !cache;

      if (isRefresh) {
        this.setState({
          loaded: false
        });
        this.src = newSrc;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var isShowSpinner = this.props.isShowSpinner;

      if (isShowSpinner && !this.state.loaded) {
        this._loadImage();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var src = _props.src;
      var defaultSrc = _props.defaultSrc;
      var isShowSpinner = _props.isShowSpinner;
      var Spinner = _props.Spinner;
      var spinnerConfig = _props.spinnerConfig;
      var spinnerContainerClassName = _props.spinnerContainerClassName;
      var onLoad = _props.onLoad;
      var onError = _props.onError;
      var other = (0, _objectWithoutProperties3.default)(_props, ['src', 'defaultSrc', 'isShowSpinner', 'Spinner', 'spinnerConfig', 'spinnerContainerClassName', 'onLoad', 'onError']);
      var loaded = this.state.loaded;


      if (isShowSpinner) {
        if (loaded) {
          return _react2.default.createElement('img', (0, _extends3.default)({ src: this.src }, other));
        } else {
          if (Spinner) {
            return _react2.default.createElement(Spinner);
          } else {
            return _react2.default.createElement(_spinner2.default, {
              config: spinnerConfig,
              containerWidth: other.width,
              containerHeight: other.height,
              containerClassName: spinnerContainerClassName });
          }
        }
      } else {
        return _react2.default.createElement('img', (0, _extends3.default)({ src: this.src }, other, { onError: this._onError.bind(this) }));
      }
    }
  }, {
    key: '_loadImage',
    value: function _loadImage() {
      var image = new Image();
      image.onload = this._onLoad.bind(this);
      image.onerror = this._onError.bind(this);
      image.src = this.src;
    }
  }, {
    key: '_onLoad',
    value: function _onLoad() {
      var onLoad = this.props.onLoad;


      this.setState({
        loaded: true
      });
      onLoad && onLoad();
    }
  }, {
    key: '_onError',
    value: function _onError() {
      var _props2 = this.props;
      var onError = _props2.onError;
      var defaultSrc = _props2.defaultSrc;


      if (defaultSrc) {
        this.src = defaultSrc;
      }

      this.setState({
        loaded: true
      });
      onError && onError();
    }
  }, {
    key: 'src',
    get: function get() {
      return this._src;
    },
    set: function set(val) {
      var cache = this.props.cache;


      this._src = val;

      // base64图片不加时间戳
      if (/^data:image/.test(val)) return;

      if (!cache) {
        if (val.indexOf('?') !== -1) {
          this._src = val + '&_=' + Date.now();
        } else {
          this._src = val + '?_=' + Date.now();
        }
      }
    }
  }]);
  return ImageX;
}(_react.Component), _class.propTypes = {
  src: _react.PropTypes.string.isRequired,
  defaultSrc: _react.PropTypes.string,
  cache: _react.PropTypes.bool,
  isShowSpinner: _react.PropTypes.bool,
  Spinner: _react.PropTypes.element,
  spinnerConfig: _react.PropTypes.object,
  spinnerContainerClassName: _react.PropTypes.string,
  onLoad: _react.PropTypes.func,
  onError: _react.PropTypes.func
}, _class.defaultProps = {
  cache: true,
  isShowSpinner: false
}, _temp);
exports.default = ImageX;
module.exports = exports['default'];