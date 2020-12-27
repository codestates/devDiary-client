function NavBar({ isLogin }) {
  return (
    <>
      <a id="logo" href="http://localhost:4000/">로고자리</a>
      <nav id="nav">
        <ul>
          <li><a href="http://localhost:4000/diary">자유게시판</a></li>
          <li><a href="http://localhost:4000/question">질문게시판</a></li>
          {isLogin === true
            ? (
              <>
                <li><a href="http://localhost:4000/user/userinfo">마이페이지</a></li>
                <li><a href="http://localhost:4000/user/logout">로그아웃</a></li>
              </>
            )
            : (
              <>
                <li><a href="http://localhost:4000/user/signup">회원가입</a></li>
                <li><a href="http://localhost:4000/user/login">로그인</a></li>
              </>
            )
          }
        </ul>
      </nav>
    </>
  )
}

export default NavBar;
