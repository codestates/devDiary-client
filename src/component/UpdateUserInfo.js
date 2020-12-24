import React from "react";
import axios from "axios";


class UpdateUserInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            checked: null, // 안건드리면 null 건드렸는데 username이랑 같으면 original 중복이면 false 중복아니면 true
            username: "",
            oldPassword:"",
            newPassword:"",
            newPasswordCheck:"",
          };
          this.handleInputValue = this.handleInputValue.bind(this);
          this.checkUsername = this.checkUsername.bind(this)
    }

    handleInputValue = (key) => (e) => {
      this.setState({ [key]: e.target.value });
    };
    
    checkUsername(){
      const username = this.state.username;
      if(username===""||username===this.props.userinfo.username){
        console.log('현재 닉네임과 동일한 닉네임입니다')
      }
      axios.post("http://localhost:4000/user/checkUsername",{username})
      .then((param)=>{
        if(param){
          this.setState({checked:false})
          console.log('사용중인 닉네임입니다.')
          // 모달창 사용중인닉넴입니다
        }else{
          this.setState({checked:true})
          console.log('사용가능한 닉네임입니다.')
          // 모달창 사용가능한 닉넴입니다
        }
      })
    }

    submitUserinfo=()=>{
      const email = this.props.userinfo.email
      const { checked, username, oldPassword, newPassword, newPasswordCheck} = this.state;
      let oldPWcheck = null;
      if(checked===null&&!oldPassword&&!newPassword&&!newPasswordCheck){
        console.log('변경 할 정보가 없습니다.')
      }else if(checked===false){
        console.log('닉네임 중복체크가 되지 않았습니다')
      }
      else if(oldPassword){
        axios.post('http://localhost:3000/checkPassword',{oldPassword})
        .then(()=>{
          oldPWcheck = true;
        })
        .catch(()=>{
          oldPWcheck = false;
        })
      }
      else if(newPassword||newPasswordCheck){
        if(!oldPWcheck){
          console.log('기존 비밀번호가 틀립니다')
        }else if(newPassword!==newPasswordCheck){
          console.log('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다')
        }else if(!oldPassword){
          console.log('비밀번호를 변경하려면 기존의 비밀번호를 입력해야 합니다')
        }
      }else if(oldPassword&&!newPassword&&!newPasswordCheck){
        console.log('비밀번호를 변경하려면 새 비밀번호와 비밀번호확인을 입력해야 합니다')
      }

      if(checked===true&&!oldPassword&&!newPassword&&!newPasswordCheck){
        axios.post('http://localhost:3000/user/updateUserinfo',{email,username})
        .then(()=>{
          console.log('회원정보가 변경되었습니다')
        })
      }else if(checked===null&&oldPassword&&newPassword&&newPasswordCheck){
        axios.post('http://localhost:3000/user/updateUserinfo',{email,oldPassword,newPassword})
        .then(()=>{
          console.log('회원정보가 변경되었습니다')
        })
      }else if(checked===true&&oldPassword&&newPassword&&newPasswordCheck){
        axios.post('http://localhost:3000/user/updateUserinfo',{email,username,oldPassword,newPassword})
        .then(()=>{
          console.log('회원정보가 변경되었습니다')
        })
      }

    }

    render() {
      return (
        <>
        <div>email : {this.props.userinfo.email}</div>
        <span>nickname : </span>
        <input type='text' value={this.props.userinfo.username} onChange={this.handleInputValue("username")}></input>
        <button onClick={this.checkUsername}>중복확인</button>
        <br></br>
        <p>닉네임 변경 시 비밀번호는 입력하지 않으셔도 됩니다.</p>
        <span>기존 비밀번호 : </span>
        <input type='password' onChange={this.handleInputValue("oldPassword")}></input>
        <br></br>
        <span>새 비밀번호 : </span>
        <input type='password' onChange={this.handleInputValue("newPassword")}></input>
        <br></br>
        <span>새 비밀번호 확인 : </span>
        <input type='password' onChange={this.handleInputValue("newPasswordCheck")}></input>
        <br></br>
        <button onClick={this.submitUserinfo}>변경</button>
        <button>탈퇴</button>
        </>
      );
    }
  }


export default UpdateUserInfo;
