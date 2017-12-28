import React, { Component } from 'react';

export default class TodoInput extends Component {
  render(){
 /*   return <input type="text" value={this.props.content}/> */
    return <input type="text" defaultValue={this.props.content}/>
  }
}
