import React, { Component } from 'react';
import './App.css';
import Contacts from "./components/Contacts";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Contacts />
      </React.Fragment>
    );
  }
}

export default App;
