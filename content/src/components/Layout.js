import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

import Home from "./Home";
import Contacts from "./Contacts";

class Layout extends React.PureComponent {
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
              <Route path="/contacts" component={Contacts} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;
