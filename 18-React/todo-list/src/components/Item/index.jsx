import React, { Component } from 'react'

export default class Item extends Component {

  updateTodo = (e) => {
    const { id } = this.props.todo;
    this.props.updateTodo(id, e.target.checked);
  }

  deleteTodo = () => {
    const { id } = this.props.todo;
    this.props.deleteTodo(id);
  }
  
  render() {
    const { todo } = this.props;
    return (
      <li>
        <label>
          <input type="checkbox" checked={todo.done} onChange={this.updateTodo} />
          <span>{todo.name}</span>
        </label>
        <button onClick={this.deleteTodo}>删除</button>
      </li>
    )
  }
}
