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
      username: "",
      phoneNumber: "",
      favoriteBooks: "",
      favoriteQuote: "",
      showEditForm: true,

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFileChange(event) {
    console.log("The file added by the user is: ", event.target.files[0])
    this.setState({
      picture: event.target.files[0]
    })
  }

  handleFormSubmit(e){
    const uploadData = new FormData() 
    uploadData.append("username", this.state.username)
    uploadData.append("picture", this.state.picture)
    uploadData.append("phoneNumber", this.state.phoneNumber)
    uploadData.append("favoriteBooks", this.state.favoriteBooks)
    uploadData.append("favoriteQuote", this.state.favoriteQuote)

    api.editProfile(uploadData)
      .then(result => {
        console.log("DID IT WORK???", result);
        this.props.updateProfile()
        this.setState({
          message: `Your profile was updated!`,
          showEditForm: !this.state.showEditForm,


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
    })
   
    }
  render() {
    return (
      <div className="editForm">
        {this.state.showEditForm ? (
          <Button onClick={e => this.showEditForm(e)} outline color="info" size="sm">
            Edit Profile
          </Button>
        ) : ( //ternary
          <form>
            Username:{" "}
            <Input type="text" value={this.state.username} name="username"onChange={this.handleInputChange}
            />{" "}
            Picture:{" "}
            <Input type="file" name="picture" onChange={this.handleFileChange} /> <br />
            {" "}<br />
            Phone:{" "}
            <Input type="text" value={this.state.phoneNumber} name="phoneNumber" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            Favorite Books:{" "}
            <Input type="text" value={this.state.favoriteBooks} name="favoriteBooks" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            Favorite Quote:{" "}
            <Input type="text" value={this.state.favoriteQuote} name="favoriteQuote" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            <Button outline color="info" onClick={() => this.handleFormSubmit()}>
              Confirm
            </Button>
          </form>
        )}
      </div>
    );
  }
}