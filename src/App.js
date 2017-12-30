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
        {/*   <TodoItem todo={item} /> */}
        { /*  <TodoItem todo={item} onToggle={this.toggle.bind(this)} /> */}
            <TodoItem todo={item} onToggle={this.toggle.bind(this)} 
              onDelete={this.delete.bind(this)}/>
          </li>
        )
      })
    /*  console.log(todos) */

    return (
      <div className="App">
        <h1>我的待办</h1>
        <div className="inputWrapper">
     {/*   <TodoInput content={this.state.newTodo} /> */}
      {/*  <TodoInput content={this.state.newTodo} onSubmit={this.addTodo} /> */}
     {/*   <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)} /> */}
        <TodoInput content={this.state.newTodo} 
          onChange={this.changeTitle.bind(this)}
          onSubmit={this.addTodo.bind(this)} />
      </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
 /* addTodo(){
    console.log('我得添加一个 todo 了') */
  toggle(e, todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
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
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state) 
  }
}

export default App;

let id = 0

function idMaker(){
  id += 1
  return id
}
