import React from "react";
import Header from "./Header";
import * as nationalParksService from "../services/nationalParks.service";
import NationalParksList from "./NationalParksList";
import { withRouter } from "react-router";

class NationalParks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalParks: [],
      header: "Discover National Parks across the US"
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    nationalParksService.readAll().then(nationalParks => {
      this.setState({
        nationalParks: nationalParks.items
      });
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.props.history.push("/national-park/" + item._id);
  }

  render() {
    return (
      <React.Fragment>
        <Header header={this.state.header} />
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6" style={{ marginLeft: "10px" }}>
            <NationalParksList
              nationalParks={this.state.nationalParks}
              onClick={this.onSelect}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(NationalParks);
