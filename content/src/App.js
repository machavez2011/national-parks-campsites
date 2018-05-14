import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Contacts from "./components/Contacts";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <div>
            <div>
              <Link to="/home" className='btn btn-link navbarBtn'>Home</Link>
              <Link to="/contacts" className='btn btn-link navbarBtn'>Contacts</Link>
            </div>
            <div>
              <Route path="/home" component={Home} />
              <Route path="/contacts" component={Contacts} />
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
