import React from "react";
import * as contactsService from "../services/contacts.service";

class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      contacts: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    contactsService.readAll().then(contacts => {
      this.setState({
        contacts: contacts.items
      });
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Contacts List</h1>
        <h3>First Name</h3>
        <input
          name="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
        />
        <h3>Last Name</h3>
        <input
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
        />
        <br />
        <button type="button">Submit Contact</button>
      </React.Fragment>
    );
  }
}

export default Contacts;
