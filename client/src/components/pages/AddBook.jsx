import React, { Component } from 'react';
import { Button, Input , Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import api from '../../api';


export default class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      genre: "",
      description: "",
      rating: "",
      pages: "",
      isbn: "",
      message: null,
      modal: false,
      _library: this.props.match.params.libraryId
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
    console.log("this.props.match.params.libraryId",this.props.match.params.libraryId)
    let data = {
      title: this.state.title,
      author: this.state.author,
      picture: this.state.picture,
      genre: this.state.genre,
      description: this.state.description,
      rating: this.state.rating,
      pages: this.state.pages,
      language: this.state.language,
      isbn: this.state.isbn,
      _library: this.props.match.params.libraryId
    }
    api.addBook(data)
    
      .then(result => {
        console.log('SUCCESS!')
        console.log("result" , result)
        this.setState({
          title: result.response.title,
          author: result.response.author,
          picture: "",
          genre: result.response.genre,
          description: result.response.description,
          rating: result.response.rating,
          pages: result.response.pages,
          language: result.response.language,
          isbn: result.response.isbn,
          _library:"",
          message: `Your book '${this.state.title}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  handleClickWithForm(event) {
    event.preventDefault()
    // console.log("this.props.match.params.libraryId",this.props.match.params.libraryId)
    let data = {
      title: this.state.title,
      author: this.state.author,
      picture: this.state.picture,
      genre: this.state.genre,
      description: this.state.description,
      rating: this.state.rating,
      pages: this.state.pages,
      language: this.state.language,
      isbn: this.state.isbn,
      _library: this.props.match.params.libraryId._id
    }
    api.addBookWithForm(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          title: "",
          author: "",
          picture: "",
          genre: "",
          description: "",
          rating: "",
          pages: "",
          language: "",
          isbn: "",
          _library:"",
          message: `Your book '${this.state.title}' has been created`
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
      {!this.state._library && <div>Loading... This is probably not a valid Library!  </div>}
        {this.state._library && (<div className="AddBook">
        <h2>Add Book</h2>
        <h3>Use ISBN to help us find the information about your book</h3>
        {/* <p className="small" color="primary">What is ISBN?</p> */}
        {/* <img src="../../../images/isbn-location.png" alt="isbn-location"></img> */}
        {/* {this.props.buttonLabel} */}
        
      <form>
          ISBN: <Input type="number" value={this.state.isbn} name="isbn" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.handleClick(e)}>Create your book</Button> <br />
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
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
          Language: <Input type="number" value={this.state.language} name="language" onChange={this.handleInputChange} /> <br />
          ISBN: <Input type="number" value={this.state.isbn} name="isbn" onChange={this.handleInputChange} /> <br />
          Description: <Input type="textarea" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.handleClickWithForm(e)}>Create Book</Button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
  
      </div>)}
      </div>
    );
  }
}