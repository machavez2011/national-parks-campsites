import React, { Component } from "react";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./App.css";

import Layout from "./components/Layout";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Layout />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
