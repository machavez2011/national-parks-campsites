import React from "react";
import * as campsitesService from "../services/campsites.service";
import CampsitesForm from "./CampsitesForm";
import CampsitesList from "./CampsitesList";
import Header from "./Header";

class Campsites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: [],
      header: "Find a campsite"
    };
    this.onSave = this.onSave.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    campsitesService.readAll().then(campsites => {
      this.setState({
        campsites: campsites.items
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

    campsitesService
      .del(formData._id)
      .then(() => {
        this.setState(prevState => {
          const updatedItems = prevState.campsites.filter(item => {
            return item._id !== formData._id;
          });

          return { campsites: updatedItems };
        });

        this.onCancel();
      })
      .catch(err => console.log(err));
  }

  onSave(updatedFormData) {
    this.setState(prevState => {
      const existingItem = prevState.campsites.filter(item => {
        return item._id === updatedFormData._id;
      });
      let updatedItems = [];
      if (existingItem && existingItem.length > 0) {
        updatedItems = prevState.campsites.map(item => {
          return item._id === updatedFormData._id ? updatedFormData : item;
        });
      } else {
        updatedItems = prevState.campsites.concat(updatedFormData);
      }
      return {
        campsites: updatedItems,
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
        <Header header={this.state.header} />
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6" style={{ marginLeft: "10px" }}>
            <CampsitesList
              campsites={this.state.campsites}
              onClick={this.onSelect}
            />
          </div>
          <div className="col-md-5">
            <h3 style={{ textAlign: "center" }}>Add a campsite:</h3>
            <CampsitesForm
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

export default Campsites;
