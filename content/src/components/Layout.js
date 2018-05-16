import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./Home";
import Contacts from "./Contacts";
import NationalParks from "./nationalParks";

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
              <Route path="/contacts" component={Contacts} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
