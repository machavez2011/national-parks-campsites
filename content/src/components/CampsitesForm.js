import React from "react";
import * as campsitesService from "../services/campsites.service";
import * as validationHelper from "../helpers/validation.helper";

class CampsitesForm extends React.Component {
  constructor(props) {
    super(props);

    const formData = this.convertPropsToFormData(props);

    this.state = {
      campsites: [],
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
    const campsite = props.formData && props.formData._id ? props.formData : {};

    const initializedCampsite = {
      _id: campsite._id || "",
      nationalPark: campsite.nationalPark || "",
      campsite: campsite.campsite || ""
    };

    let formData = {
      _id: {
        originalValue: initializedCampsite._id,
        value: initializedCampsite._id,
        valid: true,
        validation: {},
        touched: false
      },
      nationalPark: {
        originalValue: initializedCampsite.nationalPark,
        value: initializedCampsite.nationalPark,
        valid: true,
        validation: {
          required: true
        },
        touched: false
      },
      campsite: {
        originalValue: initializedCampsite.campsite,
        value: initializedCampsite.campsite,
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
      campsite: this.state.formData.campsite.value
    };

    if (this.state.formData._id.value.length > 0) {
      item._id = this.state.formData._id.value;
      campsitesService
        .update(item)
        .then(data => {
          that.props.onSave(item);
        })
        .catch(error => console.log(error));
    } else {
      campsitesService
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
            <label htmlFor="campsite">Campsite</label>
            <input
              type="text"
              name="campsite"
              className="form-control"
              id="campsite"
              value={this.state.formData.campsite.value}
              onChange={this.onChange}
            />
          </div>
          <button
            type="button"
            onClick={this.onSave}
            disabled={!this.state.formValid}
            className="btn btn-success"
          >
            Submit Campsite
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

export default CampsitesForm;
