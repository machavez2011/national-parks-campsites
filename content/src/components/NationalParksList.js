import React from "react";

// const border = {
//   border: "solid",
//   marginTop: "10px",
//   marginLeft: "10px"
// };

class NationalParksList extends React.Component {
  render() {
    const CaliforniaNationalParks = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <React.Fragment>
          {nationalPark.state === "California" ? (
            <div className="col-md-12">
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
    const NevadaNationalParks = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <React.Fragment>
          {nationalPark.state === "Nevada" ? (
            <div className="col-md-12">
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
    const WashingtonNationalParks = this.props.nationalParks ? (
      this.props.nationalParks.map(nationalPark => (
        <React.Fragment>
          {nationalPark.state === "Washington" ? (
            <div className="col-md-12">
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
        {CaliforniaNationalParks}
        <h3>Nevada</h3>
        {NevadaNationalParks}
        <h3>Washington</h3>
        {WashingtonNationalParks}
      </React.Fragment>
    );
  }
}

export default NationalParksList;
