import React, { Component } from 'react'
import { nanoid } from 'nanoid';

export default class Header extends Component {

  addTodo = (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    const todoObj = { id: nanoid(), name: event.target.value, done: false };
    this.props.addTodo(todoObj);
    event.target.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="请输入任务名称，按回车键确认" onKeyUp={this.addTodo} />
      </div>
    )
  }
}
