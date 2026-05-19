/**
 * 此文件为Count组件的UI组件(具体见react-redux模型图)
 */

import React, { Component } from 'react'

export default class Count extends Component {
  // 加
  increment = () => {
    const { value } = this.selectNumber
    this.props.add(value*1)
  }
  // 减
  decrement = () => {
    const { value } = this.selectNumber
    this.props.minus(value*1)
  }
  // 和为奇数时再加
  incrementIfOdd = () => {
    if (this.props.count % 2 === 0) return
    const { value } = this.selectNumber
    this.props.add(value*1)
  }
  // 异步加
  incrementAsync = () => {
    const { value } = this.selectNumber
    this.props.addAsync(value*1, 1000)
  }

  render() {
    console.log('UI组件从容器组件接收到的props是', this.props)
    return (
      <div>
        <h1>当前求和为{this.props.count}</h1>&nbsp;
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为奇数时再加</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}
