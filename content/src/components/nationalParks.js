import React from "react";
import Header from "./Header";
import * as nationParksService from "../services/nationalParks.service";
import NationalParksForm from "./NationalParksForm";

const border = {
  border: "solid",
  marginTop: "10px",
  marginLeft: "10px"
};

class NationalParks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalParks: [],
      header: "National Parks"
    };

    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    nationParksService.readAll().then(nationalParks => {
      this.setState({
        nationalParks: nationalParks.items
      });
    });
  }

  onCancel() {
    this.setState({ formData: null });
  }

  onDelete() {
    const formData = this.state.formData;

    nationParksService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.nationalParks.filter(item => {
            return item._id !== formData._id;
          });

          return { nationalParks: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.nationalParks.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.nationalParks.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.nationalParks.concat(updatedFormData);
      }
      return {
        nationalParks: updatedItems,
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
    const nationalParks = this.state.nationalParks ? (
      this.state.nationalParks.map(nationalPark => (
        <div className="col-md-3" style={border}>
          <li
            key={nationalPark._id}
            onClick={this.onSelect.bind(this, nationalPark)}
            style={{ listStyle: "none" }}
          >
            <div className="row">
              <div className="col-md-12">State: {nationalPark.state}</div>
            </div>
            <div className="row">
              <div className="col-md-12">National Park: {nationalPark.nationalPark}</div>
            </div>
          </li>
        </div>
      ))
    ) : (
      <React.Fragment />
    );
    return (
      <React.Fragment>
        <Header header={this.state.header} />
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6" style={{ marginLeft: "10px" }}>
            <div className="row">{nationalParks}</div>
          </div>
          <div className="col-md-5">
            <h3 style={{ textAlign: "center" }}>Add a park:</h3>
            <NationalParksForm
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

export default NationalParks;
