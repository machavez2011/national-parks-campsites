import React from "react";
import { Link } from "react-router-dom";
import woodGrain2 from "../pictures/woodGrain2.jpg";
import tentIcon from "../pictures/tentIcon.png"

const navbarBackground = {
  backgroundImage: "url(" + woodGrain2 + ")",
  textAlign: "center"
}

const navbarBtn = {
  color: "white"
}

const tentStyle = {
  height: "60px"
}
class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={ navbarBackground }>
          <img src={tentIcon} alt="tentIcon" style={tentStyle} />
          <Link to="/" className="btn btn-link" style={ navbarBtn }>
            Home
          </Link>
          <Link to="/national-parks" className="btn btn-link" style={ navbarBtn }>
            National Parks
          </Link>
          <Link to="/campsites" className="btn btn-link" style={ navbarBtn }>
            Campsites
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
