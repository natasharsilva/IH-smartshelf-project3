import React from "react";
import {
  Button,
  Input,
} from "reactstrap";
import api from "../api";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      picture: "",
      phoneNumber: "",
      favoriteBooks: "",
      favoriteQuote: "",
      showEditForm: true,

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit(){
    let data = {
      email: this.state.email,
      username: this.state.username,
      picture: this.state.picture,
      phoneNumber: this.state.phoneNumber,
      favoriteBooks: this.state.favoriteBooks,
      favoriteQuote: this.state.favoriteQuote
    };
    api.editProfile(data)
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
  };
  showEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
   
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
            Email:{" "}
            <Input
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
            />{" "}
            Username:{" "}
            <Input
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
            />{" "}
            Picture:{" "}
            <Input
              type="file"
              value={this.state.picture}
              name="picture"
              onChange={this.handleFileChange}
            />{" "}
            <br />
            Phone:{" "}
            <Input
              type="text"
              value={this.state.phoneNumber}
              name="phoneNumber"
              cols="20"
              rows="5"
              onChange={this.handleInputChange}
            />{" "}
            <br />
            Favorite Books:{" "}
            <Input
              type="text"
              value={this.state.favoriteBooks}
              name="favoriteBooks"
              cols="20"
              rows="5"
              onChange={this.handleInputChange}
            />{" "}
            <br />
            Favorite Quote:{" "}
            <Input
              type="text"
              value={this.state.favoriteQuote}
              name="favoriteQuote"
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
              Edit Profile
            </Button>
          </form>
        )}
      </div>
    );
  }
}
