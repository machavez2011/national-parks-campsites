import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import tentIcon from "../pictures/tentIcon.png"

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Navbar">
          <img src={tentIcon} alt="tentIcon" className="tent" />
          <Link to="/" className="btn btn-link home navbarBtn" >
            Home
          </Link>
          <Link to="/national-parks" className="btn btn-link navbarBtn" >
            National Parks
          </Link>
          <Link to="/campsites" className="btn btn-link navbarBtn" >
            Campsites
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
