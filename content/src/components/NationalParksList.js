import React from "react";

// const border = {
//   border: "solid",
//   marginTop: "10px",
//   marginLeft: "10px"
// };

class NationalParksList extends React.Component {
  render() {
    const nationalParksCalifornia = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <React.Fragment>
          {nationalPark.state === "California" ? (
            <div className="col-md-3">
              <li
                key={nationalPark._id}
                onClick={this.props.onClick.bind(this, nationalPark)}
              >
                {nationalPark.nationalPark}
              </li>
            </div>
          ) : null}
        </React.Fragment>
      ))
    ) : (
      <React.Fragment />
    );
    const nationalParksOtherStates = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <React.Fragment>
          {nationalPark.state !== "California" ? (
            <div className="col-md-3">
              <li
                key={nationalPark._id}
                onClick={this.props.onClick.bind(this, nationalPark)}
              >
                {nationalPark.nationalPark}
              </li>
            </div>
          ) : null}
        </React.Fragment>
      ))
    ) : (
      <React.Fragment />
    );
    return (
      <React.Fragment>
        <h3>California</h3>
        {nationalParksCalifornia}
        <h3>Other States</h3>
        {nationalParksOtherStates}
      </React.Fragment>
    );
  }
}

export default NationalParksList;
