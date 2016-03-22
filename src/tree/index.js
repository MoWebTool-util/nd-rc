import React, { Component, PropTypes } from 'react'
import styles from './styles/tree'
import Tree from 'rc-tree'
import OpenAnimation from './openAnimation'
const TreeNode = Tree.TreeNode

export default class NDTree extends Component {
  static propTypes = {
    showLine: PropTypes.bool,
    showIcon: PropTypes.bool,
    selectable: PropTypes.bool,
    multiple: PropTypes.bool,
    checkable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    checkedNodes: PropTypes.array,
    selectedNodes: PropTypes.array,
    filterTreeNode: PropTypes.func,
    onRightClick: PropTypes.func,
    disabledNode: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    disableCheckNode: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  };

  static defaultProps = {
    showLine: false,
    showIcon: false,
    selectable: true,
    multiple: false,
    checkable: true,
    checkedNodes: [],
    selectedNodes: [],
    filterTreeNode: function () {},
    onRightClick: function () {},
    disabledNode: '',
    disableCheckNode: ''
  };

  state = {
    treeData: [],
    checkedKeys: [],
    selectedKeys: []
  };

  displayName: 'NDTree';

  componentDidMount() {
    const that = this
    setTimeout(() => {
      that.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true }
        ],
        checkedKeys: that.props.checkedNodes,
        selectedKeys: that.props.selectedNodes
      })
    }, 100)
  }

  generateTreeNodes = (treeNode) => {
    const arr = []
    const key = treeNode.props.eventKey
    for (let i = 0; i < 3; i++) {
      arr.push({ name: `leaf ${key}-${i}`, key: `${key}-${i}` })
    }
    return arr
  }

  setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
      const l = lev - 1
      data.forEach((item) => {
        if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 : curKey.indexOf(item.key) !== 0) {
          return
        }
        if (item.children) {
          loopLeaf(item.children, l)
        } else if (l < 1) {
          item.isLeaf = true
        }
      })
    }
    loopLeaf(treeData, level + 1)
  }

  getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
      if (level < 1 || curKey.length - 3 > level * 2) return
      data.forEach((item) => {
        if (curKey.indexOf(item.key) === 0) {
          if (item.children) {
            loop(item.children)
          } else {
            item.children = child
          }
        }
      })
    }
    loop(treeData)
    this.setLeaf(treeData, curKey, level)
  }

  handleSelect(selectedKeys, info) {
    console.log('selected', selectedKeys)
    console.log('selected', info)
    this.setState({ selectedKeys })
  }

  handleCheck(checkedKeys, info) {
    console.log('checked', checkedKeys)
    this.setState({checkedKeys})
  }

  onLoadData(treeNode) {
    const that = this
    return new Promise((resolve) => {
      setTimeout(() => {
        const childrenNodes = that.generateTreeNodes(treeNode)
        const checkedKeys = that.state.checkedKeys
        for (let i = 0; i < checkedKeys.length; i++) {
          if (checkedKeys[i] === treeNode.props.eventKey) {
            for (let j = 0; j < childrenNodes.length; j++) {
              checkedKeys.push(childrenNodes[j].key)
            }
            break
          }
        }
        const treeData = [...that.state.treeData]
        that.getNewTreeData(treeData, treeNode.props.eventKey, childrenNodes, 2)
        that.setState({ treeData, checkedKeys })
        resolve()
      }, 500)
    })
  }

  loop(data, disabledNode, disableCheckNode) {
    const that = this
    return data.map((item) => {
      let disabled = false
      for (let i = 0; i < disabledNode.length; i++) {
        if (disabledNode[i] === item.key) {
          disabled = true
          break
        }
      }
      let disabledCheck = false
      for (let i = 0; i < disableCheckNode.length; i++) {
        if (disableCheckNode[i] === item.key) {
          disabledCheck = true
          break
        }
      }
      return <TreeNode
        title={item.name}
        key={item.key}
        isLeaf={item.isLeaf}
        disabled={disabled}
        disableCheckbox={disabledCheck}>
          {item.children ? that.loop(item.children, disabledNode, disableCheckNode) : null}
      </TreeNode>
    })
  }

  getValue() {
    return this.state
  }

  render() {
    const props = this.props
    const prefixCls = 'nd-tree'

    let checkable = props.checkable
    if (checkable) {
      checkable = React.createElement('span', { className: prefixCls + '-checkbox-inner' })
    }

    let disabledNode = props.disabledNode
    if (disabledNode.length > 0 && typeof (disabledNode) === 'string') {
      disabledNode = [disabledNode]
    }

    let disableCheckNode = props.disableCheckNode
    if (disableCheckNode.length > 0 && typeof (disableCheckNode) === 'string') {
      disableCheckNode = [disableCheckNode]
    }

    const treeNodes = this.loop(this.state.treeData, disabledNode, disableCheckNode)
    return (
      <Tree
        className={styles[prefixCls]}
        prefixCls={prefixCls}
        onSelect={::this.handleSelect}
        selectedKeys={this.state.selectedKeys}
        onCheck={::this.handleCheck}
        checkedKeys={this.state.checkedKeys}
        loadData={::this.onLoadData}
        openAnimation={OpenAnimation}
        {...props}
        checkable={checkable}>
        {treeNodes}
      </Tree>
    )
  }
}
