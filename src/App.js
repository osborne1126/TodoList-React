import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    /*  newTodo: 'test', */
      newTodo: '',
      todoList: [
    /*    {id:1, title:'第一个待办'},
        {id:2, title:'第二个待办'}, */
      ]
    }
  }
  render() {

    let todos = this.state.todoList.map((item,index)=>{
        return ( // 为什么这里要加个括号？这是动手题3 🐸
      /*    <li> */
          <li key={index} >
            <TodoItem todo={item} />
          </li>
        )
      })
      console.log(todos)

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
     {/*   <TodoInput content={this.state.newTodo} /> */}
      {/*  <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} /> */}
        <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} />
      </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
 /* addTodo(){
    console.log('我得添加一个 todo 了') */
    addTodo(event){
      this.state.todoList.push({
        id: idMaker(),
        title: event.target.value,
        status: null,
        deleted: false
      })
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
  }
}

export default App;

let id = 0

function idMaker(){
  id += 1
  return id
}
