import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'
export default class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp', // 'forgotPassword'
      formData: {
        email: '',
        username: '',
        password: '',
      }
    }
  }
  signUp(e){
    e.preventDefault()
    let {email, username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 202:
          alert('用户名已被占用')
          break
        case 203:  
          alert('电子邮箱地址已经被占用')
          break
        default:
          alert(error)
          break
      }
    }
   
    if(!username || username.length<=3){
        alert('用户名必须大于三个字符')
      }else if(!email || email.indexOf('@') == '-1'){
        alert('请输入合法的email')
      }else if(!password || password.length<=6){
        alert('密码必须不小于六个字符')
      }else{
        signUp(email, username, password, success, error)      
      }
    }
  
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 200:        
          alert('没有提供用户名，或者用户名为空')
          break
        case 201: 
          alert('没有提供密码，或者密码为空')
          break
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
          alert('找不到用户')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData(key, e){
    let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  render(){
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
        {
            this.state.selectedTab === 'signInOrSignUp' ?
              <SignInOrSignUp
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
              /> :
            <ForgotPasswordForm
              formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)}
            />
        }
        </div>
      </div>
    )
  }
  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)    
  }
}