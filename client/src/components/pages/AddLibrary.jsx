import React, { Component } from "react";
import { Button, Input, Form, FormGroup, Label, CustomInput } from "reactstrap";
import api from "../../api";
import AutocompletePlace from "../AutocompletePlace"

export default class AddLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture: null,
      address: "",
      description: "",
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this)

    //this.addLibraryAndRedirectToProfile = this.addLibraryAndRedirectToProfile.bind(this);
  }
  handleSelect(place) {
    this.setState({ place })
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFileChange(event) {
    //  event.preventDefault();
    this.setState({
      picture: event.target.files[0]
    });
  }

    addLibraryAndRedirectToProfile(e){
      // To send information with "form-data" (like in Postman)
      const uploadData = new FormData()
      uploadData.append("name", this.state.name)
      uploadData.append("picture", this.state.picture)
      uploadData.append("address", this.state.place.place_name)
      uploadData.append("coordinates_lng", this.state.place.center[0])
      uploadData.append("coordinates_lat", this.state.place.center[1])
      uploadData.append("description", this.state.description)
  
      api.createLibrary(uploadData)
      .then(createdLibrary => {
        this.setState({
          message: `Your library '${this.state.name}' has been created`
        });
        this.props.history.push('/profile')
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
    }

  render() {
    return (
      <div className="AddLibrary">
      <div className="container">
        <h2>Add Library</h2>
        <Form>
        <FormGroup>
        <Label for="name">Name</Label>
          <Input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />
         </FormGroup>
         <FormGroup>
         <Label for="picture">Picture</Label>
          <CustomInput
            type="file" 
            id="exampleCustomFileBrowser"
            // value={this.state.picture}
            name="picture"
            onChange={this.handleFileChange}
          />
          </FormGroup>
          <FormGroup>
          <Label for="address">Address</Label>
          <AutocompletePlace onSelect={this.handleSelect} />
          </FormGroup>
          <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            value={this.state.description}
            name="description"
            cols="20"
            rows="5"
            onChange={this.handleInputChange}
          />
          </FormGroup>
          <Button color="primary" className="btn-yellow-fill" onClick={e => this.addLibraryAndRedirectToProfile(e)}>
            Create Library
          </Button>
        </Form>
        {this.state.message && <div className="info">{this.state.message}</div>}
        </div>
      </div>
    );
  }
}
