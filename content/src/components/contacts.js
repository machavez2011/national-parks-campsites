import React from "react";

class Contacts extends React.PureComponent {
  constructor(props) {
      super(props);
      this.state = {
          
      }
  }
  render() {
    return (
      <React.Fragment>
        <h1>Contacts List</h1>
        <h3>First Name</h3>
        <input />
        <h3>Last Name</h3>
        <input />
      </React.Fragment>
    );
  }
}

export default Contacts;
