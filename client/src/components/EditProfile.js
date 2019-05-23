import React from "react";
import {
  Button,
  Input,
  Label,
  FormFeedback,
  CustomInput,
  Form,
  FormGroup
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import api from "../api";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.theProfile.username,
      phoneNumber: this.props.theProfile.phoneNumber,
      favoriteBooks: this.props.theProfile.favoriteBooks,
      favoriteQuote: this.props.theProfile.favoriteQuote,
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
          <div className="edit-button" style={{flexDirection:'row'}}>
          <FontAwesomeIcon icon={faUserEdit} size="1x" className="icon" onClick={e => this.showEditForm(e)}>edit</FontAwesomeIcon>
          </div>
        ) : ( //ternary
          <Form className="form-container">
            <FormGroup>
          {/* Conditional rendering to prevent not inputting any username */}
            <Label for="username">Username:{" "}</Label>
            {!this.state.username ? <div><Input invalid type="text" value={this.state.username} name="username" onChange={this.handleInputChange}
            />{" "}
            <FormFeedback>Oh noes! You have to write your username</FormFeedback></div> 
            :
            <div><Input valid type="text" value={this.state.username} name="username" onChange={this.handleInputChange}
            />{" "}</div>}
            <Label for="picture">Picture:{" "}</Label>
            <CustomInput type="file" id="exampleCustomFileBrowser" name="picture" label="Bring that smile on!" onChange={this.handleFileChange}/>
            {" "}<br />
            <Label for="phoneNumber">Phone:{" "}</Label>
            <Input type="text" value={this.state.phoneNumber} name="phoneNumber" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            </FormGroup>
            <FormGroup>
            <Label for="favoriteBooks">Favorite Books:{" "}</Label>
            <Input type="text" value={this.state.favoriteBooks} name="favoriteBooks" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            <Label for="favoriteQuote">Favorite Quote:{" "}</Label>
            <Input type="text" value={this.state.favoriteQuote} name="favoriteQuote" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "}<br />
            </FormGroup>
        {/* Show disabled button if there is no username  -> Ternary*/}
            {!this.state.username ? <Button disabled  className="confirm-profile-button" onClick={() => this.handleFormSubmit()}>
              Confirm
            </Button> :
            <Button className="confirm-profile-button" onClick={() => this.handleFormSubmit()}>
              Confirm
            </Button>}
        </Form>)}
      </div>
    );
  }
}