import React from "react";
import {
    Link,
    useHistory,
  } from "react-router-dom";

function NavBar({isLogin, username, getUserinfo, handleLogout}){
  const history = useHistory();
  const handleClick = () => {
    getUserinfo()
    history.push("/user/userinfo");
    }
    return(
      <>
        <Link id="logo" to="/">로고자리</Link>
        <nav id="nav">
          <ul>
            <li><Link to="/diary">자유게시판</Link></li>
            <li><Link to="/question">질문게시판</Link></li>
                {isLogin === true
                ?(
                <>
                <li><Link onClick={handleClick}>마이페이지</Link></li>
                <li><Link to="/user/logout" onClick={handleLogout}>로그아웃</Link></li>
  
                <p>{username}님</p>
              </>
            )
            : (
              <>
                <li><Link to="/user/signup">회원가입</Link></li>
                <li><Link to="/user/login">로그인</Link></li>
              </>
            )
          }
        </ul>
      </nav>
    </>
  )
}
export default NavBar;