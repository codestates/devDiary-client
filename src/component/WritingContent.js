import React from "react";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./css/WritingContent.css"

axios.defaults.withCredentials = true;

class WritingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: window.location.href.split("/")[3],
      id: (window.location.href.split("/")[5] > -1) ? window.location.href.split("/")[5] : "",
      title: "",
      content: "",
      tags: "",
      errorMessage: "",
    }
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { board, id } = this.state;
    if (id) {
      axios.get(`http://localhost:4000/${board}/${id}`)
        .then((param) => {
          this.setState({
            title: param.data.data ? param.data.data.title : "",
            content: param.data.data ? param.data.data.content : "",
            tags: param.data.data ? param.data.data.tags : "",
          })
        })
    }
  }

  handleInputValue = (key) => (e) => {
    if (e.target.name === "tags") {
      e.target.value = e.target.value.replace(/(\s*)/g, "");
    }
    this.setState({ [key]: e.target.value });
  };

  handleSubmit = () => {
    const { board, id, title, content, tags } = this.state;
    const todo = id ? `${id}/updatePost` : "newPost"; // 수정/id or 작성
    if (!title || !content) {
      this.setState({ errorMessage: "제목과 내용은 필수입니다" });
    } else {
      this.setState({ errorMessage: "" });
      axios.post(`http://localhost:4000/${board}/${todo}`, {
        id: id,
        title: title,
        content: content,
        tags: tags,
      })
        .then(() => {
          this.props.history.push(`/${board}`);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div className="writingContent">
        <div className="title">Title
          <input
            className="writingInput"
            placeholder="title"
            type="text"
            name="title"
            onChange={this.handleInputValue("title")}
            value={this.state.title}
          />
        </div>
        <CKEditor
          className="editor"
          config={{
            toolbar: {
              items: [
                'heading', '|',
                'bold', 'italic', 'link', '|',
                'bulletedList', 'numberedList',/* 'todoList', '|',
                  'fontfamily', 'fontsize', 'fontColor', '|', //! 아직 안됨 플러그인 설치 필요한듯..
                  'code', 'codeBlock',*/ '|',
                'undo', 'redo'
              ],
              shouldNotGroupWhenFull: true
            }
          }}
          editor={ClassicEditor}
          data={this.state.content}
          onChange={(event, editor) => {
            const data = editor.getData();
            this.setState({
              content: data,
            })
          }}
        />
        <div className="tags">Tags
          <span className="hint">
            &nbsp;&nbsp;#으로 구분하여 여러개의 태그를 입력하실수 있습니다 #입력하지 않으셔도 됩니다
          </span>
          <input
            className="writingInput"
            type="text"
            name="tags"
            onChange={this.handleInputValue("tags")}
            value={this.state.tags}
          />
        </div>
        
        <div className="alert-box">{}
          {this.state.errorMessage ? (
            <div class="alert">
              {this.state.errorMessage}
            </div>
          ) : <></>}
        </div>
        <button
          className="submit"
          type="submit"
          onClick={this.handleSubmit}
        >
          등록
        </button>
      </div>
    )
  }
}

export default WritingContent;
