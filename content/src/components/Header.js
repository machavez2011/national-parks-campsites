import React from "react";
//import greenBackground from "../pictures/lightGreen.jpg";

const headerBackgroundImage = {
  //backgroundImage: "url(" + greenBackground + ")",
  height: "60px",
  backgroundColor: "#e3f7d9"
};

const header = {
  textAlign: "center",
  marginBottom: "0px",
  paddingTop: "10px"
};

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div style={headerBackgroundImage}>
          <h2 style={header}>{this.props.header}</h2>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
