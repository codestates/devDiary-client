import './css/DeleteModal.css'
import React from "react";
import axios from "axios";


class DeleteModal extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      deleteText:"탈퇴하지마세요..",
      copyText:"",
      errMsg:""
    }
    this.handleInputValue = this.handleInputValue.bind(this)
    this.clickDelete = this.clickDelete.bind(this)
  }

  handleInputValue = (e) => {
    this.setState({ copyText: e.target.value });
  };

  clickDelete(){
    const {deleteText, copyText} = this.state;
    if(deleteText === copyText){
      this.props.deleteUserInfo()
      this.props.deleteCompleteUserInfo()
      // axios.post("http://localhost:3000/user/deleteUser", )
      // .then(()=>{this.props.deleteUserInfo()})
      // .then(()=>{this.props.deleteCompleteUserInfo()})
    }else{
      this.setState({errMsg:"문구가 일치하지 않습니다"})
    }
  }

//탈퇴버튼을 눌렀을 때 같으면 보내고 닫고 열기
// 안같으면 에러메세지띄우기

  render(){
    return(
      <>
      <div className='deleteModal' onClick={this.props.deleteUserInfo} >
        <div className='container' onClick={(e)=>e.stopPropagation()}>
          <span>탈퇴하려면 아래 문구를 입력창에 작성해주세요</span>
          <h2>탈퇴하지마세요..</h2>
          <input type='text' onChange={this.handleInputValue}></input>
          <div>{this.state.errMsg}</div>
          <button onClick={this.clickDelete}>진짜 탈퇴하기</button>
        </div>
      </div>
    </>
    )
  }

}

export default DeleteModal;