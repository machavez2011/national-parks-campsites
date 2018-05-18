import React from "react";

const border = {
    border: "solid",
    marginTop: "10px",
    marginLeft: "10px"
  };

class NationalParksList extends React.Component {
    constructor(props) {
        super(props);
    }
  render() {
    const nationalParks = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <div className="col-md-3" style={border}>
          <li
            key={nationalPark._id}
            onClick={this.props.onClick.bind(this, nationalPark)}
            style={{ listStyle: "none" }}
          >
            <div className="row">
              <div className="col-md-12">State: {nationalPark.state}</div>
            </div>
            <div className="row">
              <div className="col-md-12">
                National Park: {nationalPark.nationalPark}
              </div>
            </div>
          </li>
        </div>
      ))
    ) : (
      <React.Fragment />
    );
    return (
      <React.Fragment>
        {nationalParks}
      </React.Fragment>
    );
  }
}

export default NationalParksList;
