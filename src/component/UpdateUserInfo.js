import React from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal"
import CompleteModal from "./CompleteModal"
class UpdateUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: null, // 안건드리면 null 중복이면 false 중복아니면 true
      oldPWcheck: false,
      username: "johnson",
      oldPassword: "",
      newPassword: "",
      newPasswordCheck: "",
      errorMsg:"",
      isDelete:false,
      isComplete:false
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }
  //state 변경함수
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    if (e.target.name === "oldPassword" || e.target.name === "newPassword" || e.target.name === "newPasswordCheck") {
      this.checkPassword();
    }
  };
  //닉네임 중복확인
  checkUsername = () => {
    const username = this.state.username;
    if (this.state.checked === null || username === this.props.userinfo.username) {
      this.setState({ errorMsg: '현재 닉네임과 동일한 닉네임입니다' })
    }else{
    axios.post("http://localhost:4000/user/checkUsername", { username:username })
      .then((param) => {
        if (param.data.message==="invalid") {
          this.setState({ checked: false })
          this.setState({ errorMsg: '사용중인 닉네임입니다' })
        } else if(param.data.message==="valid"){
          this.setState({ checked: true })
          this.setState({ errorMsg: '사용가능한 닉네임입니다' })
        }
      })
    }
  }
  // 비번입력창에 입력하기 시작하면 실행되는 함수
  checkPassword = () => { 
    const { oldPassword, newPassword, newPasswordCheck} = this.state;
    if(!oldPassword) {               
      this.setState({ errorMsg: '비밀번호를 변경하려면 기존의 비밀번호를 입력해야 합니다' })//새비번,비번확인은 있고 구비번만 없을 때
    } else if (!newPassword || !newPasswordCheck) {     
      this.setState({ errorMsg: '비밀번호를 변경하려면 새 비밀번호와 비밀번호확인을 입력해야 합니다' })//새비번이나 비번확인 없을 때
    } else if (newPassword!==newPasswordCheck) {              
      this.setState({ errorMsg: '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다' })//새비번 비번확인 다를 때
    } else if (newPassword===newPasswordCheck){
      this.setState({ errorMsg: '새 비밀번호와 새 비밀번호 확인이 일치합니다' })
    }
  };
   // 제출버튼 누르면 실행되는 함수
  submitUserinfo = () => {
    const email = this.props.userinfo.email
    const { checked, username, oldPassword, newPassword, newPasswordCheck, oldPWcheck } = this.state;
    let body;
    if (this.state.checked === null && !oldPassword && !newPassword && !newPasswordCheck) {  
      this.setState({ errorMsg: '변경 할 정보가 없습니다' })      //변경사항 없을 때
    } else if (checked === false) {                       
      this.setState({ errorMsg: '닉네임 중복체크가 되지 않았습니다' })//닉넴 중복체크 안했을 때
    }
    else if (oldPassword) {//현재 비번이 채워져있으면 일치여부 확인
      axios.post('http://localhost:4000/user/checkPassword', {
        oldPassword: oldPassword
      })
        .then(() => {//현재비번 맞을 때
          this.setState({oldPWcheck:true})
        })
        .catch(() => {              
          this.setState({ errorMsg: '기존 비밀번호가 틀립니다' })//현재비번 틀릴 때
        })
    }
    if (checked === true && !oldPassword && !newPassword && !newPasswordCheck) {
      body = {
        email: email,
        username: username
      }
    } else if (checked === null && oldPWcheck && newPassword) {
      body = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    } else if (checked === true && oldPWcheck && newPassword) {
      body = {
        email: email,
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword
      }
    }
    axios.post('http://localhost:4000/user/updateUserinfo', body, {withCredentials:true})
        .then((param) => {
          if(param.username){
            this.props.updateUsername(param.username)
          }
        })
  }
  deleteUserInfo=(e)=>{
    this.setState({
      isDelete:!this.state.isDelete
    })
  }
  deleteCompleteUserInfo=(e)=>{
    this.setState({
      isComplete:!this.state.isComplete
    })
  }
  render() {
    return (
      <>
        <div>email : {this.props.userinfo.email}</div>
        <span>nickname : </span>
        <input type='text' placeholder={this.props.userinfo.username} onChange={this.handleInputValue("username")}></input>
        <button onClick={this.checkUsername}>중복확인</button>
        <br></br>
        <p>닉네임만 변경 시 비밀번호는 입력하지 않으셔도 됩니다.</p>
        <span>기존 비밀번호 : </span>
        <input type='password' name='oldPassword' onChange={this.handleInputValue("oldPassword")}></input>
        <br></br>
        <span>새 비밀번호 : </span>
        <input type='password' name='newPassword' onChange={this.handleInputValue("newPassword")}></input>
        <br></br>
        <span>새 비밀번호 확인 : </span>
        <input type='password' name='newPasswordCheck' onChange={this.handleInputValue("newPasswordCheck")}></input>
        <br></br>
        <div>{this.state.errorMsg}</div>
        <button onClick={this.submitUserinfo}>변경</button>
        <button onClick={this.deleteUserInfo}>탈퇴</button>
        {this.state.isDelete&&(
          <DeleteModal deleteUserInfo={this.deleteUserInfo} deleteCompleteUserInfo={this.deleteCompleteUserInfo}></DeleteModal>
        )}
        {this.state.isComplete&&(
          <CompleteModal deleteUserInfo={this.deleteUserInfo} deleteCompleteUserInfo={this.deleteCompleteUserInfo}></CompleteModal>
        )}
      </>
    );
  }
}
export default UpdateUserInfo;