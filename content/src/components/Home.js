import React from "react";
import campground from "../pictures/campground.jpg";
import Header from "./Header";

const heroImage = {
  width: "100%"
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "National Park Campsites"
    };
  }
  render() {
    return (
      <React.Fragment>
        <Header header={this.state.header} />
        <img src={campground} alt="wood" style={heroImage} />
      </React.Fragment>
    );
  }
}

export default Home;
