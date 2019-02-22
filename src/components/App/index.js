import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../sass/main.scss";
import BodyClass from "../body";
import Navigation from "../Navigation";
import Admin from "../Admin";
import Logo from "../../img/logo.png";
import Logo1 from "../../img/logo_1.png";
import * as ROUTES from "../../Constants/routes";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="/">
              <img src={Logo1} class="d-inline-block align-top logo" alt="" />
            </a>
            <Navigation />
          </nav>
          <Route exact path={ROUTES.LANDING} component={BodyClass} />
          <Route exact path={ROUTES.ADMIN} component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
