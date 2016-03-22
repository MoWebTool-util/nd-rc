import React, { Component } from 'react'
import Tree from '../../src/tree'
export default class TreeDemo extends Component {
  getTreeData() {
    const treeData = this.refs.tree.getValue()
    console.log(treeData)
  }

  render() {
    return (
      <div>
        <Tree ref="tree" />
        <div><button type="button" onClick={::this.getTreeData}>获取树数据</button></div>
      </div>
    )
  }
}
