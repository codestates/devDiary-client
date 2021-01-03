import React from "react";
import {
    Link,
    useHistory,
  } from "react-router-dom";
import './css/NavBar.css'
function NavBar({isLogin, username, getUserinfo, handleLogout}){
  const history = useHistory();
  const handleClick = () => {
    getUserinfo()
      .then(() => {
        history.push("/user/userinfo");
      })
    }
    return(
        <header>
        <nav id="nav">
        <Link id="logo" to="/">Dev-diary</Link>
          <ul>
            <li><Link to="/diary">diary</Link></li>
            <li><Link to="/question">question</Link></li>
                {isLogin === true
                ?( 
                <>
                <li><Link onClick={handleClick}>{username}님</Link></li>
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