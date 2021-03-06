import React from "react";
import * as nationParksService from "../services/nationalParks.service";
import NationalParksForm from "./NationalParksForm";
import NationalParksList from "./NationalParksList";

class NationalParks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalParks: [],
      header: "Discover National Parks across the US"
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
    return (
      <React.Fragment>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6" style={{ marginLeft: "10px" }}>
            <NationalParksList
              nationalParks={this.state.nationalParks}
              onClick={this.onSelect}
            />
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
