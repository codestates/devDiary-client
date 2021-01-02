import React from "react";
import {
  Link,
} from "react-router-dom";
import "./css/NavBar.css";

function NavBar({ isLogin, username, handleLogout }) {
  return (
    <nav> 
    
      <Link id="logo" to="/">DevDiary</Link>
      
          {isLogin === true
            ? (
                <ul className="usertag">
                  {/* <li className="li"></li> */}
                  <li className="li"><Link className="listnav" to="/user/userinfo">{username}님</Link></li>
                  <li className="li"><Link className="listnav" to="" onClick={handleLogout}>로그아웃</Link></li>
                </ul>
            )
            : (
              <ul className="usertag">
                <li className="li"><Link className="listnav" to="/user/signup">회원가입</Link></li>
                <li className="li"><Link className="listnav" to="/user/login">로그인</Link></li>
              </ul>
            )
          }
        <ul className="divtag">
          <li className="li"><Link className='listnav' to="/diary">자유게시판</Link></li>
          <li className="li"><Link className="listnav" to="/question">질문게시판</Link></li>
          </ul>
        {/* </ul> */}
    
    </nav>
  )
}
export default NavBar;