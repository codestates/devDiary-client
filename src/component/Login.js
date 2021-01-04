import React from "react";
import { Link,withRouter } from "react-router-dom";
import axios from "axios";
import "./css/Login.css"
class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = { //post용
        email: "",
        password: "",
        errorMessage: ""
      };
      this.handleInputValue = this.handleInputValue.bind(this);
    }
    handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
    };
    handleLogin = () => {
      const { email, password} = this.state; //변수할당
      if(email&&password){ //다 채워져있으면 서버에보내기
        axios.post('http://localhost:4000/user/login',{
          email:email,
          password:password
        },{ withCredentials: true })
        .then((param)=>{
          this.props.handleResponseSuccess(param.data)//로그인 여부 바꾸는 함수 실행
          window.sessionStorage.email = param.data.email //세션저장
          window.sessionStorage.username = param.data.username
          window.sessionStorage.isLogin = true
        }).then(()=>{
            this.props.history.push("/") // 메인화면으로 넘어가기
        }).catch(()=>{
          this.setState({errorMessage: '일치하는 회원 정보가 없습니다.'})
        })
      }else{
        this.setState({errorMessage: '이메일과 비밀번호는 필수입니다.'})
      }
    };
    //36 -> 다음페이지로 넘어가는 모션 취소 자세한건 12.23 노션참조
    render() {
      return (
        <div className="Login-Frame">
        <h1 className="Login-MainTitle">LogIn</h1>
        <form onSubmit={(e) => e.preventDefault()}>  
          <div className="Login-interbal">
            <span className="Login-title">이메일</span>
            <input className="Login-Controll" type='email' onChange={this.handleInputValue("email")}></input>
          </div>
          <div className="Login-interbal">
            <span className="Login-title">비밀번호</span>
            <input className="Login-Controll" type='password' onChange={this.handleInputValue("password")}></input>
          </div>
          {<div className="LoginAlert-box">{this.state.errorMessage}</div>}
          <button className="Login-button" type='submit' onClick={this.handleLogin}>
            로그인
          </button>
          <div className="Login-bottom-interbal">
            <Link to='/user/signUp'>
              <button className="Login-Signup-button">회원가입</button>
            </Link>
          </div>
        </form>
    </div>
      );
    }
  }
  export default withRouter(Login);