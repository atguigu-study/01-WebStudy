import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    const { todos, checkAllTodo, clearAllDone } = this.props;
    const doneCount = todos.filter(todo => todo.done).length;
    const checked = doneCount === todos.length && todos.length !== 0;
    return (
      <div>
        <input type="checkbox" checked={checked} onChange={() => checkAllTodo(checked)} />
        <span>已完成{doneCount}/{todos.length}</span>
        <button onClick={clearAllDone}>清除已完成任务</button>
      </div>
    )
  }
}
