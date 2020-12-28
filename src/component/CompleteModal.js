import {
  withRouter
} from "react-router-dom";
import React from "react"
import "./css/DeleteModal.css"

  class CompleteModal extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        <>
          <div className='deleteModal' onClick={this.props.deleteUserInfo} >
            <div className='container' onClick={(e) => e.stopPropagation()}>
              <div>탈퇴가 정상처리 되었습니다</div>
              <button onClick={() => { this.props.history.push("/") }}>닫기</button>
            </div>
          </div>
        </>
      )
    }
  }


export default withRouter(CompleteModal)