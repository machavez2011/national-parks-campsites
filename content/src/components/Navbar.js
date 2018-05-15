import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Link to="/home" className="btn btn-link navbarBtn">
          Home
        </Link>
        <Link to="/contacts" className="btn btn-link navbarBtn">
          Contacts
        </Link>
      </React.Fragment>
    );
  }
}

export default Navbar;
