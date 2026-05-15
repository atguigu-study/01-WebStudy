import React, { Component } from 'react'
import Item from '../Item';

export default class List extends Component {
  render() {
    const { todos, updateTodo, deleteTodo } = this.props;
    return (
      <ul>
        {todos.map((todo) => {
          return <Item key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        })}
      </ul>
    )
  }
}
