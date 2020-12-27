import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
    const { email, password } = this.state; //변수할당
    if (email && password) { //다 채워져있으면 서버에보내기
      axios.post('http://localhost:4000/user/login', {
        email: email,
        password: password
      })
        .then(() =>
          this.props.handleResponseSuccess() //로그인 여부 바꾸는 함수 실행
        ).then(() => {
          // this.props.history.push("/") // 메인화면으로 넘어가기
        })
    } else {
      this.setState({ errorMessage: '이메일과 비밀번호를 입력하세요' })
    }
  };
  //36 -> 다음페이지로 넘어가는 모션 취소 자세한건 12.23 노션참조
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <span>이메일</span>
            <input type='email' onChange={this.handleInputValue("email")}></input>
          </div>
          <div>
            <span>비밀번호</span>
            <input type='password' onChange={this.handleInputValue("password")}></input>
          </div>
          <div>
            <Link to='/user/signup'><button>회원가입</button></Link>
          </div>
          <button className='btn btn-login' type='submit' onClick={this.handleLogin}>
            로그인
          </button>
          {<div className="alert-box">{this.state.errorMessage}</div>}
        </form>
      </div>
    );
  }
}

export default Login;
