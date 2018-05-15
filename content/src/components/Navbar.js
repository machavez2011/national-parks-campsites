import React from "react";
import { Link } from "react-router-dom";
import woodGrain2 from "../pictures/woodGrain2.jpg";

const navbarBackground = {
  backgroundImage: "url(" + woodGrain2 + ")"
}

const navbarBtn = {
  color: "white"
}

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={ navbarBackground }>
          <Link to="/home" className="btn btn-link" style={ navbarBtn }>
            Home
          </Link>
          <Link to="/contacts" className="btn btn-link" style={ navbarBtn }>
            Contacts
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
