import React, { Component } from 'react';
import { Button, Input , Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import api from '../../api';


export default class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      picture: "",
      address: "",
      description: "",
      message: null,
      modal: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleFileChange(event) {
    console.log("The file added by the user is: ", event.target.files[0])
    this.setState({
      picture: event.target.files[0]
    })
  }


  handleClick(event) {
    event.preventDefault()
    console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      picture: this.state.picture,
      address: this.state.address,
      description: this.state.description,
    }
    api.createLibrary(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          picture: "",
          address: "",
          description: "",
          message: `Your library '${this.state.name}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }



  render() {
    return (
      <div className="AddBook">
        <h2>Add Book</h2>
        <h3>Use ISBN to help us find the information about your book</h3>
        {/* <p className="small" color="primary">What is ISBN?</p> */}
        {/* <img src="../../../images/isbn-location.png" alt="isbn-location"></img> */}
        {/* {this.props.buttonLabel} */}
        
      <form>
          ISBN: <Input type="number" value={this.state.isbn} name="isbn" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.handleClick(e)}>Search for your book</Button> <br />
        </form>
        <br />
        <div>
        <Button color="primary" onClick={this.toggle}>What is ISBN?</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>What is ISBN?</ModalHeader>
          <ModalBody className="modal-body">
          <img src="../../../images/isbn-location.png" alt="isbn-location"></img><br />
          An ISBN gets placed on the copyright page inside the book and, if there is no bar code, on the back cover.<br />
          It can have 10 or 13 digits.
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
      <br />
      <h3>Or fill the form manually. Don't worry, it's quite short!</h3>
        <form>
          Title: <Input type="text" value={this.state.title} name="title" onChange={this.handleInputChange} /> <br />
          Author: <Input type="text" value={this.state.author} name="author" onChange={this.handleInputChange} /> <br />
          Genre: <Input type="text" value={this.state.genre} name="genre" onChange={this.handleInputChange} /> <br />
          Picture: <Input type="file" value={this.state.picture} name="picture" onChange={this.handleFileChange} /> <br />
          Rating: <Input type="number" value={this.state.rating} name="rating" onChange={this.handleInputChange} /> <br />
          Pages: <Input type="number" value={this.state.pages} name="pages" onChange={this.handleInputChange} /> <br />
          ISBN: <Input type="number" value={this.state.isbn} name="isbn" onChange={this.handleInputChange} /> <br />
          Description: <Input type="textarea" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.handleClick(e)}>Create Library</Button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}