import React from "react";
import * as nationalParksService from "../services/nationalParks.service";
import * as validationHelper from "../helpers/validation.helper";

class NationalParksForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      nationalParks: [],
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
    const nationalPark =
      props.formData && props.formData._id ? props.formData : {};

    const initializedNataionalPark = {
      _id: nationalPark._id || "",
      state: nationalPark.state || "",
      nationalPark: nationalPark.nationalPark || ""
    };

    let formData = {
      _id: {
        originalValue: initializedNataionalPark._id,
        value: initializedNataionalPark._id,
        valid: true,
        validation: {},
        touched: false
      },
      state: {
        originalValue: initializedNataionalPark.state,
        value: initializedNataionalPark.state,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      nationalPark: {
        originalValue: initializedNataionalPark.nationalPark,
        value: initializedNataionalPark.nationalPark,
        valide: true,
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
      state: this.state.formData.state.value,
      nationalPark: this.state.formData.nationalPark.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      nationalParksService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      nationalParksService
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
            <label htmlFor="phoneNumber">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              id="state"
              value={this.state.formData.state.value}
              onChange={this.onChange}
            />
            <select
              value={this.state.formData.state.value}
              onChange={this.onChange}
              name="state"
            >
              <option>Select</option>
              <option value="California">California</option>
              <option value="Washington">Washington</option>
              <option value="Nevada">Nevada</option>
            </select>
          </div>
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
          <button
            type="button"
            onClick={this.onSave}
            disabled={!this.state.formValid}
            className="btn btn-success"
          >
            Submit Park
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

export default NationalParksForm;
