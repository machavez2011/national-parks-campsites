import React from "react";

class CampsitesList extends React.Component {
    render() {
    const yosemiteCampsites = this.props.campsites ? (
      this.props.campsites.map(campsite => (
        <React.Fragment>
          {campsite.nationalPark === "Yosemite" ? (
            <div className="col-md-12">
              <li
                key={campsite._id}
                onClick={this.props.onClick.bind(this, campsite)}
              >
                {campsite.campsite}
              </li>
            </div>
          ) : null}
        </React.Fragment>
      ))
    ) : (
      <React.Fragment />
    );
    const sequoiaCampsites = this.props.campsites ? (
      this.props.campsites.map(campsite => (
        <React.Fragment>
          {campsite.nationalPark === "Sequoia" ? (
            <div className="col-md-12">
              <li
                key={campsite._id}
                onClick={this.props.onClick.bind(this, campsite)}
              >
                {campsite.campsite}
              </li>
            </div>
          ) : null}
        </React.Fragment>
      ))
    ) : (
      <React.Fragment />
    );
    const deathValleyCampsites = this.props.campsites ? (
      this.props.campsites.map(campsite => (
        <React.Fragment>
          {campsite.nationalPark === "Death Valley" ? (
            <div className="col-md-12">
              <li
                key={campsite._id}
                onClick={this.props.onClick.bind(this, campsite)}
              >
                {campsite.campsite}
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
        <h3>Yosemite</h3>
        {yosemiteCampsites}
        <h3>Sequoia</h3>
        {sequoiaCampsites}
        <h3>Death Valley</h3>
        {deathValleyCampsites}
      </React.Fragment>
    );
  }
}

export default CampsitesList;
