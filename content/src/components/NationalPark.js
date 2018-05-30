import React from "react";
import Header from "./Header";
import * as nationalParksService from "../services/nationalParks.service";

class NationalPark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalPark: []
    };
    this.getNationalParkInfo = this.getNationalParkInfo.bind(this);
  }

  componentDidMount() {
    this.getNationalParkInfo();
  }

  getNationalParkInfo() {
    let nationalParkId = this.props.match.params.id;
    nationalParksService.readById(nationalParkId).then(nationalParkInfo =>
      this.setState({
        nationalPark: nationalParkInfo.item
      })
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header header={this.state.nationalPark.nationalPark} />
        <h1>{this.state.nationalPark.state}</h1>
      </React.Fragment>
    );
  }
}

export default NationalPark;
