import React from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
function NavBar({isLogin}){
    return(
        <Router>
            <Link id="logo" to="/">로고자리</Link>
        <nav id="nav">
            <ul>
                <li><Link to="/diary">자유게시판</Link></li>
                <li><Link to="/question">질문게시판</Link></li>
                {isLogin === true
                ?(
                <>
                <li><Link to="/user/userinfo">마이페이지</Link></li>
                <li><Link to="/user/logout">로그아웃</Link></li>
                </>
                )
                :(
                <>
                <li><Link to="/user/signup">회원가입</Link></li>
                <li><Link to="/user/login">로그인</Link></li>
                </>
                )
                }
            </ul>
        </nav>
        </Router>
    )
}

export default NavBar;
