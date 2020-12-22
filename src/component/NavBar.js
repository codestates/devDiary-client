function NavBar({isLogin}){
    return(
        <>
        <a id="logo" href="http://localhost:3000">로고자리</a>
        <nav id="nav">
            <ul>
                <li><a href="http://localhost:3000">자유게시판</a></li>
                <li><a href="http://localhost:3000">질문게시판</a></li>
                {isLogin === true
                ?(
                <>
                <li><a href="http://localhost:3000">마이페이지</a></li>
                <li><a href="http://localhost:3000">로그아웃</a></li>
                </>
                )
                :(
                <>
                <li><a href="http://localhost:3000">회원가입</a></li>
                <li><a href="http://localhost:3000">로그인</a></li>
                </>
                )
                }
            </ul>
        </nav>
        </>
    )
}

export default NavBar;