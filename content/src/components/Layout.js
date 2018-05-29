import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./Home";
import Campsites from "./Campsites";
import NationalParks from "./NationalParks";
import NationalParksAdmin from "./NationalParksAdmin";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/national-parks" component={NationalParks} />
              <Route path="/admin/national-parks" component={NationalParksAdmin} />
              <Route path="/campsites" component={Campsites} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
