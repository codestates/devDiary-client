import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import "./css/SignUp.css"
axios.defaults.withCredentials = true;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailChecked: false,
      emailMessage: "",
      firstPassword: "",
      lastPassword: "",
      passwordMessage: "",
      password: "",
      username: "",
      usernameChecked: false,
      usernameMessage: "",
      errorMessage: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    if (e.target.name === "firstPassword" || e.target.name === "lastPassword") {
      setTimeout(this.checkPassword, 100);
    }
  };
  checkPassword = () => {
    const { firstPassword, lastPassword } = this.state;
    if (firstPassword.length < 1 || lastPassword.length < 1) {
      this.setState({
        passwordMessage: "비밀번호를 입력 해 주세요",
      });
    } else if (firstPassword.length < 6 || firstPassword.length > 12) {
      this.setState({
        passwordMessage: "비밀번호는 6~12자리 이내로 입력 해 주세요",
      });
    } else if (firstPassword === lastPassword) {
      this.setState({
        passwordMessage: "비밀번호가 일치합니다",
        password: firstPassword,
      });
    } else {
      this.setState({
        passwordMessage: "비밀번호가 일치하지 않습니다",
      });
    }
  };
  checkEmail = () => {
    function isEmail(asValue) {
      let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(asValue);
    }
    const { email } = this.state;
    if (!email) {
      this.setState({
        emailMessage: "이메일을 입력 해 주세요",
        emailChecked: false
      })
    } else if (!isEmail(email)) {
      this.setState({
        emailMessage: "이메일 형식이 올바르지 않습니다",
        emailChecked: false
      })
    } else {
      axios.post("http://localhost:4000/user/checkEmail", {
        email: email
      })
        .then(res => {
          if (res.data) {
            this.setState({
              emailMessage: "이미 가입된 이메일 입니다",
              emailChecked: false
            })
          } else {
            this.setState({
              emailMessage: "사용 가능한 이메일 입니다",
              emailChecked: true
            });
          }
        })
    }
  }
  checkUsername = () => {
    const { username } = this.state;
    if (username === "") {
      this.setState({
        usernameMessage: "닉네임을 입력 해 주세요",
        usernameChecked: false
      })
    } else {
      axios.post("http://localhost:4000/user/checkUsername", {
        username: username
      })
        .then(res => {
          if (res.data.message === "invalid") {
            this.setState({
              usernameMessage: "사용 중인 닉네임 입니다",
              usernameChecked: false
            })
          } else {
            this.setState({
              usernameMessage: "사용 가능한 닉네임 입니다",
              usernameChecked: true
            });
          }
        })
    }
  }
  handleSignup = () => {
    const { username, password, email, emailChecked, usernameChecked } = this.state;
    if (!username || !password || !email) {
      this.setState({ errorMessage: "모든 항목은 필수입니다" });
    } else if (!emailChecked || !usernameChecked) {
      this.setState({ errorMessage: "이메일과 닉네임 중복 확인을 해주세요" });
    } else {
      axios.post("http://localhost:4000/user/signup", {
        username: username,
        password: password,
        email: email
      })
        .then(() => {
          this.props.history.push("/user/login");
        });
    }
  }
  render() {
    const { firstPassword, lastPassword, passwordMessage, emailMessage, usernameMessage, errorMessage } = this.state;
    return (
      <div className="signframe">
        <center>
          <h1 className="SignUp-MainTitle">Sign Up</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="SignUp-interbal">
              <span className="signuptitle">이메일</span>
              <button
                className="SignUp-button"
                type="submit"
                onClick={this.checkEmail}
              >중복확인</button>
              <input
                className="SignUp-Controll"
                type="email"
                onChange={this.handleInputValue("email")}
              />
              <div className="SignUpCheckalert-box">{emailMessage}</div>
            </div>
            <div className="SignUp-interbal">
              <span className="signuptitle">비밀번호</span>
              <input
                className="SignUp-Controll"
                name="firstPassword"
                type="password"
                onChange={this.handleInputValue("firstPassword")}
                value={firstPassword}
              />
            </div>
            <div className="SignUp-interbal">
              <span className="signuptitle">비밀번호 확인</span>
              <input
                className="SignUp-Controll"
                name="lastPassword"
                type="password"
                onChange={this.handleInputValue("lastPassword")}
                value={lastPassword}
              />
              <div className="SignUpCheckalert-box">{passwordMessage}</div>
            </div>
            <div className="SignUp-interbal"> 
              <span className="signuptitle">닉네임</span>
              <button
                className="SignUp-button"
                type="submit"
                onClick={this.checkUsername}
              >중복확인</button>
              <input
                className="SignUp-Controll"
                type="text"
                onChange={this.handleInputValue("username")}
              />
              <div className="SignUpCheckalert-box">{usernameMessage}</div>
            </div>
            <div>
              <Link to="/user/login">이미 아이디가 있으신가요?</Link>
            </div>
            <div className="signupalert-box">{errorMessage}</div>
            <button
              className="SignUp-button-result"
              type="submit"
              onClick={this.handleSignup}
            >
              회원가입
            </button>
          </form>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);