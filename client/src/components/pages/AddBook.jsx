import React, { Component } from 'react';
import { Button, Input , Modal, ModalHeader, ModalBody } from 'reactstrap';
import api from '../../api';
import axios from 'axios';


export default class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      author: "",
      genre: "",
      picture:null,
      description: "",
      rating: "",
      pages: "",
      isbn: "",
      language:"",
      message: null,
      isbn_message:null,
      modal: false,
      _library: this.props.match.params.libraryId
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFileChange(e) {
    console.log("The file added by the user is: ", e.target.files[0])
    this.setState({
      picture: e.target.files[0]
    })
  }

  getInfoFromApi(e){
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}`)
    .then(response => {
       console.log("response.imageLinks[0]--->" , response.data.items[0].volumeInfo.imageLinks.thumbnail)
       console.log("this.state.picture--->" , this.state.picture)

         this.setState({
        title: response.data.items[0].volumeInfo.title,
        author: response.data.items[0].volumeInfo.authors[0],
        genre: response.data.items[0].volumeInfo.categories
          ? response.data.items[0].volumeInfo.categories[0]
          : "Provide a genre",
        picture: response.data.items[0].volumeInfo.imageLinks.thumbnail,
        description: response.data.items[0].volumeInfo.description,
        rating: response.data.items[0].volumeInfo.averageRating,
        pages: response.data.items[0].volumeInfo.pageCount,
        language: response.data.items[0].volumeInfo.language,
        isbn:response.data.items[0].volumeInfo.industryIdentifiers[1].identifier,
        isbn_message:`Ỳour book's name is ${response.data.items[0].volumeInfo.title}. If this information is worng, fill below the form with the correct information`,
        _library: `ObjectId(${this.props.match.params.libraryId})`})
      }
    ).catch(err => this.setState({ isbn_message: 'We do not have this book in our database. Please fill the form' }))
    // ).catch(err => this.setState({ message: err.toString() }))
  }

  addBookAndRedirectToLibraryPage(e){
    // console.log("this.props.match.params.libraryId",this.props.match.params.libraryId)
    const uploadData = new FormData()
    uploadData.append("title", this.state.title)
    uploadData.append("author", this.state.author)
    uploadData.append("picture", this.state.picture)
    uploadData.append("genre", this.state.genre)
    uploadData.append("description", this.state.description)
    uploadData.append("rating", this.state.rating)
    uploadData.append("pages", this.state.pages)
    uploadData.append("language", this.state.language)
    uploadData.append("isbn", this.state.isbn)
    uploadData.append("_library", this.props.match.params.libraryId)
    console.log("uploadData------->",uploadData)
    
    api.addBookWithForm(uploadData)
      .then(result => {
        console.log('result--->',result)
        this.setState({
          message: `Your book '${this.state.title}' has been created`
        });
        
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
          <Button color="primary" onClick={(e) => this.getInfoFromApi(e)}>Check your book's info</Button> <br />
        </form>
        {this.state.isbn_message && <div className="info">
          {this.state.isbn_message}
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
          Picture: 
          <img src={this.state.picture} alt="" /><br />
          <Input type="file" name="picture" onChange={this.handleFileChange} /> <br />
          Rating: <Input type="number" value={this.state.rating} name="rating" onChange={this.handleInputChange} /> <br />
          Pages: <Input type="number" value={this.state.pages} name="pages" onChange={this.handleInputChange} /> <br />
          Language: <Input type="text" value={this.state.language} name="language" onChange={this.handleInputChange} /> <br />
          ISBN: <Input type="number" value={this.state.isbn} name="isbn" onChange={this.handleInputChange} /> <br />
          Description: <Input type="textarea" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.addBookAndRedirectToLibraryPage(e)}>Create Book</Button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
        <Button color="primary" href={`/libraries/${this.props.match.params.libraryId}`}>Go Back</Button>
  
      </div>)}
      </div>
    );
  }
}