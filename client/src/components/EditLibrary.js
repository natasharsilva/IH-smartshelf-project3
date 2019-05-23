import React from "react";
import {
  Button,
  Input,
  CustomInput,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import api from "../api";
import AutocompletePlace from "./AutocompletePlace"

export default class EditLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.theLibrary.name,
      address: "",
      description: this.props.theLibrary.description,
      showEditForm: true,
      picture: null,
      libraryId: this.props.theLibrary._id
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(place) {
    this.setState({ place })
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

  handleFormSubmit(e) {
    let uploadData = new FormData()
      uploadData.append("name", this.state.name)
      uploadData.append("address", this.state.place.place_name )
      uploadData.append("picture", this.state.picture)
      uploadData.append("coordinates_lng", this.state.place.center[0])
      uploadData.append("coordinates_lat", this.state.place.center[1])
      uploadData.append("description", this.state.description)

    api.updateLibrary(this.state.libraryId,uploadData)
      .then(result => {
        this.props.updateLibrary()
        console.log("DID IT WORK???", result);
        this.setState({
          message: `library was updated!`,
          showEditForm: !this.state.showEditForm
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }))
      }

  showEditForm = () => {
    this.setState({
      showEditForm: !this.state.showEditForm
    });
  }
  render() {
    return (
      <div className="editForm">
        {this.state.showEditForm ? (
          <div className="edit-button" style={{flexDirection:'row'}}>
          <FontAwesomeIcon icon={faEdit} size="1x" className="icon" onClick={e => this.showEditForm(e)}>edit</FontAwesomeIcon>
          </div>

        ) : (
          <Form className="form-container">
            <FormGroup>
            <Label for="name">Name:{" "}</Label>
            <Input type="name" value={this.state.name} name="name" onChange={this.handleInputChange}
            />
            {" "}<br />
            <Label for="address">Address:{" "}</Label>
            <AutocompletePlace onSelect={this.handleSelect} />
            {" "}<br />
            <Label for="picture">Picture:{" "}</Label>
            <CustomInput type="file" id="exampleCustomFileBrowser" name="picture" onChange={this.handleFileChange}/>
            {" "}<br />
            <Label for="description">Description:{" "}</Label>
            <Input type="text" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange}
            />{" "} <br />
            </FormGroup>
            {!this.state.place ? <Button disabled  onClick={() => this.handleFormSubmit()}>
            Must have an address to update
            </Button> :
            <Button outline color="info" onClick={() => this.handleFormSubmit()}
            >
              Confirm
            </Button>}
            <Button onClick={this.showEditForm} className="add-library-button btn">
              Back
              </Button>

          </Form>
        )}
      </div>
    );
  }
}