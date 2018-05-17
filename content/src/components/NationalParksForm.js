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
      nationalPark: nationalPark.nationalPark || "",
      state: nationalPark.state || ""
    };

    let formData = {
      _id: {
        originalValue: initializedNataionalPark._id,
        value: initializedNataionalPark._id,
        valid: true,
        validation: {},
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
      },
      state: {
        originalValue: initializedNataionalPark.state,
        value: initializedNataionalPark.state,
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

  

  render() {
    return (
      <React.Fragment>
        <h1>Hello World</h1>
      </React.Fragment>
    );
  }
}

export default NationalParksForm;
