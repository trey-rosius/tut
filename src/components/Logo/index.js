import React from "react";
import Logo from "../../img/logo.png";
import Logo1 from "../../img/logo_1.png";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
const LogoClass = () => (
  <Router>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/">
          <img src={Logo1} class="d-inline-block align-top logo" alt="" />
        </a>
        <Navigation />
      </nav>
    </div>
  </Router>
);
export default LogoClass;
