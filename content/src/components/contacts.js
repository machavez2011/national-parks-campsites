import React from "react";
import * as contactsService from "../services/contacts.service";
import ContactsForm from "./ContactsForm";

class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    contactsService.readAll().then(contacts => {
      this.setState({
        contacts: contacts.items
      });
    });
  }

  // onChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    contactsService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.contacts.filter(item => {
            return item._id !== formData._id;
          });

          return { contacts: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.contacts.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.contacts.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.contacts.concat(updatedFormData);
      }
      return {
        contacts: updatedItems,
        formData: null,
        errorMessage: null
      };
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({
      formData: item
    });
  }

  render() {
    const contacts = this.state.contacts ? (
      this.state.contacts.map(contact => (
        <li key={contact._id} onClick={this.onSelect.bind(this, contact)}>
          {contact.nationalPark} {contact.phoneNumber}
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <h3>Contact a Park Ranger for more information</h3>
        <ContactsForm
          formData={this.state.formData}
          onSave={this.onSave}
          onDelete={this.onDelete}
          onCancel={this.onCancel}
        />
        <ul>{contacts}</ul>
      </React.Fragment>
    );
  }
}

export default Contacts;
