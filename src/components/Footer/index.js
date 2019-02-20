import googlePlay from "../../img/google_play.png";
import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <span className="footerTitle">
          Download Tuprofession mobile App from Google Playstore
        </span>
        <img
          src={googlePlay}
          alt="google play button"
          className="googleplay-btn"
        />
      </div>
    );
  }
}
export default Footer;
