import React from "react";
import "./css/Footer.css"

function Footer(){
  return(
    <div className="footer">
      <div className="footer-frame">
        <div className="footer-title">FrontEnd: </div>
        <div className="footer-members">한현우 h900506@gmail.com</div>
        <div className="footer-members">차채윤 codbs54@gmail.com</div>
      </div>
      <div className="footer-frame">
        <div className="footer-title">BackEnd: </div>
        <div className="footer-members">백종혁 opplane@gmail.com</div>
        <div className="footer-members">최윤검 cjh7687@gmail.com</div>
    </div>
    </div>
  )
}

export default Footer;
