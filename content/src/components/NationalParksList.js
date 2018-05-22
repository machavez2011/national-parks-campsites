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
    return <React.Fragment>{statesAndNationalParks}</React.Fragment>;
  }
}

export default NationalParksList;
