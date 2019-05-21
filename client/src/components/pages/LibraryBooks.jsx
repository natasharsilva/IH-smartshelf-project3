import React, { Component } from "react";
import { Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col  } from 'reactstrap';
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
              <p>Filter By Book Title</p>

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
                  <div className="CardMain">
                    <Card>
                    <Container>
                    <Row>
                    <Col xs="3">
                      <CardImg top width="20%" src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`} />
                        {/* <img src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`}/> */}
                        </Col>
                    <Col xs="9">
                      <CardBody>
                        <CardTitle>Title:{bookDetail.title}</CardTitle>
                        <CardTitle>Author:{bookDetail.author}</CardTitle>
                        <CardSubtitle>Genre:{bookDetail.genre}</CardSubtitle>
                        <CardText>{bookDetail.description}</CardText>
                        
                        {this.state.role === "admin" && <Button color="danger" onClick={e => this.deleteBook(e,bookDetail)}>Delete Book</Button>}
                        {bookDetail._currentOwner && bookDetail._currentOwner !== "000000000000000000000000" && 
                        <div><br /><Alert color="warning" >This Book is not available for the moment - It has been borrowed.</Alert></div> }
                      
                      </CardBody>
                     </Col>
                      </Row>
                      </Container>
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
    Promise.all([
    api.getLibrary(this.props.match.params.libraryId),
    api.getMember(this.props.match.params.libraryId)
  ]).then(([response,member]) => {
        console.log("response------->", response);
        this.setState({
          library: response.library,
          book: response.book,
          role: member[0].role
        });
        console.log("ARE YOU AN ADMIN?? ROLE:", this.state.role)
        console.log('currentOwner-------->',this.state.book[0]._currentOwner)

      })
      .catch(err => console.log(err));
  }
}
