import React from "react";
import * as contactsService from "../services/contacts.service";
import * as validationHelper from "../helpers/validation.helper";

class ContactsForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      contacts: [],
      formData: formData,
      formValid: false
    };

    this.onChange = validationHelper.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const contact = props.formData && props.formData._id ? props.formData : {};

    const initializedContact = {
      _id: contact._id || "",
      firstName: contact.firstName || "",
      lastName: contact.lastName || ""
    };

    let formData = {
      _id: {
        originalValue: initializedContact._id,
        value: initializedContact._id,
        valid: true,
        validation: {},
        touched: false
      },
      firstName: {
        originalValue: initializedContact.firstName,
        value: initializedContact.firstName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      lastName: {
        originalValue: initializedContact.lastName,
        value: initializedContact.lastName,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      }
    };

    for (let fieldName in formData) {
      const field = formData[fieldName];
      field.valid = validationHelper.validate(field.value, field.validation);
    }

    return formData;
  }

  onSave(event) {
    if (!this.state.formValid) {
      const formData = JSON.parse(JSON.stringify(this.state.formData));
      for (let fieldIdentifier in formData) {
        formData[fieldIdentifier].touched = false;
      }
      this.setState({ formData: formData });
      return;
    }
    const that = this;
    let item = {
      firstName: this.state.formData.firstName.value,
      lastName: this.state.formData.lastName.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      contactsService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      contactsService
        .create(item)
        .then(data => {
          this.setState(prevState => {
            const field = { ...prevState.formData._id, _id: data };
            const formData = { ...prevState.formData, _id: field };
            return { ...prevState, formData: formData };
          });

          that.props.onSave({ ...item, _id: data.item });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <React.Fragment>
        <form>
          <h1>Contacts List</h1>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={this.state.formData.firstName.value}
            onChange={this.onChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="firstName"
            value={this.state.formData.lastName.value}
            onChange={this.onChange}
          />
          <br />
          <br />
          <button
            type="button"
            onClick={this.onSave}
            disabled={!this.state.formValid}
          >
            Submit Contact
          </button>
          <button
            type="button"
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => this.props.onDelete(this.state.formData)}
          >
            Delete
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ContactsForm;
