import React, { Component } from 'react'
import Tree from '../../src/tree'
import styles from '../../src/tree/styles/tree'
const TreeNode = Tree.TreeNode

export default class TreeDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: []
    }
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

  timeout(duration = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve.bind(this), duration)
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        treeData: [
          { name: 'pNode 01', key: '0-0' },
          { name: 'pNode 02', key: '0-1' },
          { name: 'pNode 03', key: '0-2', isLeaf: true }
        ]
      })
    }, 100)
  }

  handleSelect(info) {
    console.log('selected', info)
  }

  onLoadData(treeNode) {
    const that = this
    return new Promise((resolve) => {
      setTimeout(() => {
        const treeData = [...that.state.treeData]
        that.getNewTreeData(treeData, treeNode.props.eventKey, that.generateTreeNodes(treeNode), 2)
        that.setState({ treeData })
        resolve()
      }, 500)
    })
  }

  render() {
    const loop = (data) => data.map((item) => {
      if (item.children) {
        return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>
      }
      return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />
    })
    const treeNodes = loop(this.state.treeData)
    return (
      <div className={styles['nd-tree']}>
        <Tree className={styles['rc-tree']} onSelect={this.onSelect} loadData={::this.onLoadData}>
          {treeNodes}
        </Tree>
      </div>
    )
  }
}
