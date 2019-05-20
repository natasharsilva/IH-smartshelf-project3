import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import api from "../../api";


export default class LibraryBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        library: {},
        book: {}
      },
      member: [],
      search: "",
      message:"",
    };
    this.changeSearch = this.changeSearch.bind(this);
  }

  changeSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  deleteBook(e, bookDetail) {
    console.log("IS THIS THE BOOK YOU WANT TO DELETE?", bookDetail._id)
    e.preventDefault()
     api.deleteBook(bookDetail._id)
     .then(response => {
      console.log("DID IT WORK???", response)
      api.getLibrary(this.props.match.params.libraryId)
      .then(response => {
      this.setState({
        message: `Your book was deleted succesfully`,
        library: response.library,
        book: response.book
      })
    })
  })
}

  render() {
    return (
      <div className="LibraryBooks">
        {(!this.state.book || !this.state.library) && <div>Loading... Make sure you're inside a library!</div>}
        {this.state.book && (<div>
          <div>
            {/* <Button color="primary" href={`/libraries/${this.state.library}`}>Go Back to {this.state.library}</Button> */}
            {/* <h1>{this.state.library}</h1> */}
            <h2>List of Books / Book Details</h2>
            <p>
              <input
                type="text"
                value={this.state.search}
                onChange={this.changeSearch}
              />
            </p>
            <Button href={`/${this.state.library}/add-book`} color="primary">ADD BOOK</Button>
            <br />

            {/* <h3>{this.state.boo}</h3> */}
            <ul>
              {this.state.book
                .filter(bookDetail =>
                  bookDetail.title
                    .toUpperCase()
                    .includes(this.state.search.toUpperCase())
                )
                .map(bookDetail => (
                  <li key={bookDetail._id}>
                  <div>
                    <Card>
                      <CardImg top width="100%" src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`} />
                        {/* <img src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`}/> */}
                      <CardBody>
                        <CardTitle>Title:{bookDetail.title}</CardTitle>
                        <CardTitle>Author:{bookDetail.author}</CardTitle>
                        <CardSubtitle>Genre:{bookDetail.genre}</CardSubtitle>
                        <CardText>{bookDetail.description}</CardText>
                        <Button color="danger" onClick={e => this.deleteBook(e,bookDetail)}>Delete Book</Button>
                      </CardBody>
                    </Card>
                  </div>
                  <br />
                  </li>
                ))}
            </ul>
          </div> 
          </div>)}
      </div>
    );
  }

  componentDidMount() {
    // console.log(this.props.match)
    api.getLibrary(this.props.match.params.libraryId)
      .then(response => {
        console.log("response------->", response);
        this.setState({
          library: response.library,
          book: response.book
        });
      })
      .catch(err => console.log(err));
  }
}
