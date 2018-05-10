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
    const contacts = this.state.contacts ? (
      this.state.contacts.map(contact => (
        <li key={contact._id}>
          {contact.firstName} {contact.lastName}
        </li>
      ))
    ) : (
      <React.Fragment />
    );

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
        <br />
        <button type="button">Submit Contact</button>
        <ul>{contacts}</ul>
      </React.Fragment>
    );
  }
}

export default Contacts;
