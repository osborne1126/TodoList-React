import React from 'react'; // 为什么要 import React
class Welcome extends React.Component {
  constructor(props){
    super(props)
    // 上面照抄，不懂的话看 MDN 
    this.state = {
      date: new Date()
    }
  }
  render() {
  /*  return <h1>Hello, Component</h1>; */
  /*  return <h1>Hello, {this.props.name}</h1>; */
    return (
        <div>
          <h1>Hello, {this.props.name}</h1>
          <h2>{this.state.date.toString()}</h2>
        </div>
      )
  }
}

export default Welcome // 为什么要 export，为什么要加 default
