import React, { Component } from 'react'
import axios from 'axios';

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

export default class App extends Component {

  state = {
    todos: [
      { id: '001', name: '吃饭', done: true },
      { id: '002', name: '睡觉', done: true },
      { id: '003', name: '打代码', done: false },
      { id: '004', name: '逛街', done: false }
    ]
  }

  addTodo = (todoObj) => {
    const { todos } = this.state;
    const newTodos = [todoObj, ...todos];
    this.setState({ todos: newTodos });
  }

  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done };
      } else {
        return todo;
      }
    });
    this.setState({ todos: newTodos });
  }

  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => todo.id !== id);
    this.setState({ todos: newTodos });
  }

  checkAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => {
      return { ...todo, done: !done };
    });
    this.setState({ todos: newTodos });
  }

  clearAllDone = () => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => !todo.done);
    this.setState({ todos: newTodos });
  }

  getStudentList = async () => {
    axios.get('http://localhost:3000/api1/students').then((res) => console.log(res.data), (err) => console.log(err));
  }

  getCarList = async () => {
    axios.get('http://localhost:3000/api2/cars').then((res) => console.log(res.data), (err) => console.log(err));
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
        <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        <button onClick={this.getStudentList}>获取学生列表</button>
        <button onClick={this.getCarList}>获取汽车列表</button>
      </div>
    )
  }
}

