import React from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "../Admin";

import * as ROUTES from "../../Constants/routes";
function handleClick(e) {
  e.preventDefault();
  console.log("The link was clicked.");
  //<Route exact path={ROUTES.ADMIN} component={Admin} />;
}
const Navigation = () => (
  <div>
    <ul className="menu">
      <button type="button" class="btn btn-outline-primary">
        <Link to={ROUTES.ADMIN}>Admin Log In</Link>
      </button>
      <button
        type="button"
        onClick={handleClick}
        class="btn btn-outline-primary"
      >
        <Link to={ROUTES.LANDING}>Landing</Link>
      </button>
    </ul>
  </div>
);

export default Navigation;
