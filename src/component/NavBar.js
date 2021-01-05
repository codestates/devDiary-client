import React from "react";
import {
    Link,
  } from "react-router-dom";
import './css/NavBar.css'
import imgfile from './css/image/logo_transparent.png'
function NavBar({isLogin, username, handleLogout}){
    return(
        <header>
        <nav id="nav">
         <Link id="logo" to="/"><img src={imgfile}></img></Link>
          <ul>
            <li><Link to="/diary">Diary</Link></li>
            <li><Link to="/question">Question</Link></li>
                {isLogin === true
                ?( 
                <>
                <li><Link to="/user/userinfo">{username}님</Link></li>
                <li><Link to="/user/logout" onClick={handleLogout}>로그아웃</Link></li>
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
      </header>
  )
}
export default NavBar;