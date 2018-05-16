import React from "react";
import * as contactsService from "../services/contacts.service";
import ContactsForm from "./ContactsForm";
import Header from "./Header";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      header: "Contact a park ranger for more information"
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
        <li
          key={contact._id}
          onClick={this.onSelect.bind(this, contact)}
          style={{ listStyle: "none" }}
        >
          <div className="row">
            <div className="col-md-6">{contact.nationalPark}</div>
            <div className="col-md-6">{contact.phoneNumber}</div>
          </div>
        </li>
      ))
    ) : (
      <React.Fragment />
    );

    return (
      <React.Fragment>
        <Header header={this.state.header} />
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h3>Locations:</h3>
              </div>
              <div className="col-md-6">
                <h3>Numbers:</h3>
              </div>
            </div>
            <ul>{contacts}</ul>
          </div>
          <div className="col-md-6">
            <h3 style={{ textAlign: "center" }}>Add a location:</h3>
            <ContactsForm
              formData={this.state.formData}
              onSave={this.onSave}
              onDelete={this.onDelete}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contacts;
