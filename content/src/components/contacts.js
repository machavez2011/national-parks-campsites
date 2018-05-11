import React from "react";
import * as contactsService from "../services/contacts.service";
import ContactsForm from "./ContactsForm";

class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // firstName: "",
      // lastName: "",
      contacts: []
    };
    //this.onChange = this.onChange.bind(this);
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

  // onSave() {
  //   let newContact = {
  //     firstName: this.state.firstName,
  //     lastName: this.state.lastName
  //   }
  //   //const that = this;
  //   contactsService.create(newContact)
  //     .then(contact => {
  //       this.setState(prevState => {
  //         //contacts: [...that.state.contacts, contact.ops]
  //         // return {contacts: [prevState.contacts, contact.ops]}
  //         const field = { ...prevState.formData._id, _id: contact };
  //         const contact = { ...prevState.formData, _id: field };
  //         return { ...prevState, contacts: contact}
  //       })
  //     });
  // }

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
          {contact.firstName} {contact.lastName}
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <ContactsForm
          formData={this.state.formData}
          onSave={this.onSave}
          onDelete={this.onDelete}
          onCancel={this.onCancel}
        />

        {/* <h1>Contacts List</h1> */}
        {/* <h3>First Name</h3> */}
        {/* <input
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
        <button type="button" onClick={this.onSave}>
          Submit Contact
        </button> */}
        <ul>{contacts}</ul>
      </React.Fragment>
    );
  }
}

export default Contacts;
