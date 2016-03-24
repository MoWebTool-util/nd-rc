'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tree = require('./styles/tree');

var _tree2 = _interopRequireDefault(_tree);

var _rcTree = require('rc-tree');

var _rcTree2 = _interopRequireDefault(_rcTree);

var _openAnimation = require('./openAnimation');

var _openAnimation2 = _interopRequireDefault(_openAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNode = _rcTree2.default.TreeNode;

var NDTree = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(NDTree, _Component);

  function NDTree() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NDTree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(NDTree)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      treeData: [],
      checkedKeys: [],
      selectedKeys: []
    }, _this.generateTreeNodes = function (treeNode) {
      var arr = [];
      var key = treeNode.props.eventKey;
      for (var i = 0; i < 3; i++) {
        arr.push({ name: 'leaf ' + key + '-' + i, key: key + '-' + i });
      }
      return arr;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(NDTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var that = this;
      setTimeout(function () {
        that.setState({
          treeData: [{ name: 'pNode 01', key: '0-0' }, { name: 'pNode 02', key: '0-1' }, { name: 'pNode 03', key: '0-2', isLeaf: true }],
          checkedKeys: that.props.checkedNodes,
          selectedKeys: that.props.selectedNodes
        });
      }, 100);
    }
  }, {
    key: 'setLeaf',
    value: function setLeaf(treeData, curKey, level) {
      var loopLeaf = function loopLeaf(data, lev) {
        var l = lev - 1;
        data.forEach(function (item) {
          if (item.key.length > curKey.length ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
            return;
          }
          if (item.children) {
            loopLeaf(item.children, l);
          } else if (l < 1) {
            item.isLeaf = true;
          }
        });
      };
      loopLeaf(treeData, level + 1);
    }
  }, {
    key: 'getNewTreeData',
    value: function getNewTreeData(treeData, curKey, child, level) {
      var loop = function loop(data) {
        if (level < 1 || curKey.length - 3 > level * 2) return;
        data.forEach(function (item) {
          if (curKey.indexOf(item.key) === 0) {
            if (item.children) {
              loop(item.children);
            } else {
              item.children = child;
            }
          }
        });
      };
      loop(treeData);
      this.setLeaf(treeData, curKey, level);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(selectedKeys, info) {
      console.log('selected', selectedKeys);
      console.log('selected', info);
      this.setState({ selectedKeys: selectedKeys });
    }
  }, {
    key: 'handleCheck',
    value: function handleCheck(checkedKeys, info) {
      console.log('checked', checkedKeys);
      this.setState({ checkedKeys: checkedKeys });
    }
  }, {
    key: 'onLoadData',
    value: function onLoadData(treeNode) {
      var that = this;
      return new _promise2.default(function (resolve) {
        setTimeout(function () {
          var childrenNodes = that.generateTreeNodes(treeNode);
          var checkedKeys = that.state.checkedKeys;
          for (var i = 0; i < checkedKeys.length; i++) {
            if (checkedKeys[i] === treeNode.props.eventKey) {
              for (var j = 0; j < childrenNodes.length; j++) {
                checkedKeys.push(childrenNodes[j].key);
              }
              break;
            }
          }
          var treeData = [].concat((0, _toConsumableArray3.default)(that.state.treeData));
          that.getNewTreeData(treeData, treeNode.props.eventKey, childrenNodes, 2);
          that.setState({ treeData: treeData, checkedKeys: checkedKeys });
          resolve();
        }, 500);
      });
    }
  }, {
    key: 'loop',
    value: function loop(data, disabledNode, disableCheckNode) {
      var that = this;
      return data.map(function (item) {
        var disabled = false;
        for (var i = 0; i < disabledNode.length; i++) {
          if (disabledNode[i] === item.key) {
            disabled = true;
            break;
          }
        }
        var disabledCheck = false;
        for (var i = 0; i < disableCheckNode.length; i++) {
          if (disableCheckNode[i] === item.key) {
            disabledCheck = true;
            break;
          }
        }
        return _react2.default.createElement(
          TreeNode,
          {
            title: item.name,
            key: item.key,
            isLeaf: item.isLeaf,
            disabled: disabled,
            disableCheckbox: disabledCheck },
          item.children ? that.loop(item.children, disabledNode, disableCheckNode) : null
        );
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.state;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var prefixCls = 'nd-tree';

      var checkable = props.checkable;
      if (checkable) {
        checkable = _react2.default.createElement('span', { className: prefixCls + '-checkbox-inner' });
      }

      var disabledNode = props.disabledNode;
      if (disabledNode.length > 0 && typeof disabledNode === 'string') {
        disabledNode = [disabledNode];
      }

      var disableCheckNode = props.disableCheckNode;
      if (disableCheckNode.length > 0 && typeof disableCheckNode === 'string') {
        disableCheckNode = [disableCheckNode];
      }

      var treeNodes = this.loop(this.state.treeData, disabledNode, disableCheckNode);
      return _react2.default.createElement(
        _rcTree2.default,
        (0, _extends3.default)({
          className: _tree2.default[prefixCls],
          prefixCls: prefixCls,
          onSelect: this.handleSelect.bind(this),
          selectedKeys: this.state.selectedKeys,
          onCheck: this.handleCheck.bind(this),
          checkedKeys: this.state.checkedKeys,
          loadData: this.onLoadData.bind(this),
          openAnimation: _openAnimation2.default
        }, props, {
          checkable: checkable }),
        treeNodes
      );
    }
  }]);
  return NDTree;
}(_react.Component), _class.propTypes = {
  showLine: _react.PropTypes.bool,
  showIcon: _react.PropTypes.bool,
  selectable: _react.PropTypes.bool,
  multiple: _react.PropTypes.bool,
  checkable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.node]),
  checkedNodes: _react.PropTypes.array,
  selectedNodes: _react.PropTypes.array,
  filterTreeNode: _react.PropTypes.func,
  onRightClick: _react.PropTypes.func,
  disabledNode: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]),
  disableCheckNode: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array])
}, _class.defaultProps = {
  showLine: false,
  showIcon: false,
  selectable: true,
  multiple: false,
  checkable: true,
  checkedNodes: [],
  selectedNodes: [],
  filterTreeNode: function filterTreeNode() {},
  onRightClick: function onRightClick() {},
  disabledNode: '',
  disableCheckNode: ''
}, _temp2);
exports.default = NDTree;
module.exports = exports['default'];