import React, { Component } from 'react'
import store from './redux/store'
import { incrementAction, decrementAction } from './redux/actions'

export default class index extends Component {

  increment = () => {
    const { value } = this.selectNumber
    store.dispatch(incrementAction(value*1))
  }
  decrement = () => {
    const { value } = this.selectNumber
    store.dispatch(decrementAction(value*1))
  }
  incrementOfOdd = () => {
    const count = store.getState()
    if (count % 2 === 0) return
    const { value } = this.selectNumber
    store.dispatch(incrementAction(value*1))
  }
  incrementOfAsync = () => {
    const { value } = this.selectNumber
    setTimeout(() => {
      store.dispatch(incrementAction(value*1))
    }, 1000)
  }

  render() {
    return (
      <div>
        <h1>当前求和为{store.getState()}</h1>&nbsp;
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementOfOdd}>和为奇数时再加</button>&nbsp;
        <button onClick={this.incrementOfAsync}>异步加</button>
      </div>
    )
  }
}
