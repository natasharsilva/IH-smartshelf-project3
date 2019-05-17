import React from "react";
import {
  Button,
  Input,
} from "reactstrap";
import api from "../api";

export default class EditLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      picture: "",
      description: "",
      showEditForm: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit() {
    let data = {
      name: this.state.name,
      address: this.state.address,
      // picture: this.state.picture,
      description: this.state.description
    };
    api
      .editProfile(data)
      .then(result => {
        console.log("DID IT WORK???", result);
        this.setState({
          message: `Your profile was updated!`,
          showEditForm: !this.state.showEditForm
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  showEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  }
  render() {
    return (
      <div className="editForm">
        {this.state.showEditForm ? (
          <Button
            onClick={e => this.showEditForm(e)}
            outline
            color="info"
            size="sm"
          >
            Edit Profile
          </Button>
        ) : (
          <form>
            Name:{" "}
            <Input
              type="Name"
              value={this.state.Name}
              name="name"
              onChange={this.handleInputChange}
            />{" "}
            Address:{" "}
            <Input
              type="text"
              value={this.state.address}
              name="address"
              onChange={this.handleInputChange}
            />{" "}
            <br />
            Description:{" "}
            <Input
              type="text"
              value={this.state.description}
              name="description"
              cols="20"
              rows="5"
              onChange={this.handleInputChange}
            />{" "}
            <br />
            <Button
              outline
              color="info"
              onClick={() => this.handleFormSubmit()}
            >
              Edit Library
            </Button>
          </form>
        )}
      </div>
    );
  }
}
