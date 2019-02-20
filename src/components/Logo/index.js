import React from "react";
import Logo from "../../img/logo.png";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
const LogoClass = () => (
  <Router>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/">
          <img src={Logo} class="d-inline-block align-top logo" alt="" />
          <span class="appName"> TuProfession</span>
        </a>
        <Navigation />
      </nav>
    </div>
  </Router>
);
export default LogoClass;
