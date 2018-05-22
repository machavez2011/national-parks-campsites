import React from "react";

class NationalParksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: ["California", "Washington", "Nevada"]
    };
  }
  render() {
    const statesAndNationalParks = this.state.state
      ? this.state.state.map(state => (
          <React.Fragment>
            <h3>{state}</h3>
            <ul>
              {this.props.nationalParks
                ? this.props.nationalParks.map(nationalPark => (
                    <React.Fragment>
                      {nationalPark.state === state ? (
                        <div className="col-md-12">
                          <li
                            key={nationalPark._id}
                            onClick={this.props.onClick.bind(
                              this,
                              nationalPark
                            )}
                          >
                            {nationalPark.nationalPark}
                          </li>
                        </div>
                      ) : null}
                    </React.Fragment>
                  ))
                : null}
            </ul>
          </React.Fragment>
        ))
      : null;

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
        {/* <h3>California</h3>
        {CaliforniaNationalParks}
        <h3>Nevada</h3>
        {NevadaNationalParks}
        <h3>Washington</h3>
        {WashingtonNationalParks} */}

        {statesAndNationalParks}
      </React.Fragment>
    );
  }
}

export default NationalParksList;
