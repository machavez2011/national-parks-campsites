import React from "react";
import * as contactsService from "../services/contacts.service";
import * as validationHelper from "../helpers/validation.helper";

class ContactsForm extends React.Component {
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
      nationalPark: contact.nationalPark || "",
      phoneNumber: contact.phoneNumber || ""
    };

    let formData = {
      _id: {
        originalValue: initializedContact._id,
        value: initializedContact._id,
        valid: true,
        validation: {},
        touched: false
      },
      nationalPark: {
        originalValue: initializedContact.nationalPark,
        value: initializedContact.nationalPark,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      phoneNumber: {
        originalValue: initializedContact.phoneNumber,
        value: initializedContact.phoneNumber,
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
      nationalPark: this.state.formData.nationalPark.value,
      phoneNumber: this.state.formData.phoneNumber.value
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
        <form className="container">
          <div className="form-group">
            <label htmlFor="nationalPark">National Park</label>
            <input
              type="text"
              name="nationalPark"
              className="form-control"
              id="nationalPark"
              value={this.state.formData.nationalPark.value}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              id="phoneNumber"
              value={this.state.formData.phoneNumber.value}
              onChange={this.onChange}
            />
          </div>
          <button
            type="button"
            onClick={this.onSave}
            disabled={!this.state.formValid}
            className="btn btn-success"
          >
            Submit Contact
          </button>
          <button
            type="button"
            onClick={this.props.onCancel}
            className="btn btn-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => this.props.onDelete(this.state.formData)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default ContactsForm;
