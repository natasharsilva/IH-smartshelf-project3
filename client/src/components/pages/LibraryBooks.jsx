import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col
} from "reactstrap";
import { NavLink as Nlink } from "react-router-dom";
import DeleteBook from "../DeleteBook";
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
      message: "",
      showAlertDeleteBook: false
    };
    // this.toggleAlertDeleteBook = this.toggleAlertDeleteBook.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }

  toggleAlertDeleteBook() {
    this.setState({
      showAlertDeleteBook: !this.state.showAlertDeleteBook
    });
  }

  changeSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  // deleteBook(e, bookDetail) {
  //   console.log("IS THIS THE BOOK YOU WANT TO DELETE?", bookDetail._id);
  //   e.preventDefault();
  //   api.deleteBook(bookDetail._id).then(response => {
  //     console.log("DID IT WORK???", response);
  //   });
  // }

  handleDeleteBook() {
    api.getLibrary(this.props.match.params.libraryId).then(response => {
      this.setState({
        message: `Your book was deleted successfully`,
        library: response.library,
        book: response.book
      });
    });
  }

  render() {
    return (
      <div className="LibraryBooks">
        {(!this.state.book || !this.state.library) && (
          <div>Loading... Make sure you're inside a library!</div>
        )}
        {this.state.book && (
          <div>
            <div>
              {/* <Button color="primary" href={`/libraries/${this.state.library}`}>Go Back to {this.state.library}</Button> */}
              {/* <h1>{this.state.library}</h1> */}
              <h2>List of Books</h2>
              <p className="searchInput">
                <input
                  type="text"
                  value={this.state.search}
                  onChange={this.changeSearch}
                />
                <br />
                Filter by book title
              </p>
              <Button
                href={`/${this.state.library._id}/add-book`}
                className="library-books-btn"
              >
                Add book
              </Button>
              <Button
                href={`/libraries/${this.state.library._id}`}
                className="library-books-btn"
              >
                Go back
              </Button>
              <br />
              <ul>
                {this.state.book
                  .filter(bookDetail =>
                    bookDetail.title
                      .toUpperCase()
                      .includes(this.state.search.toUpperCase())
                  )
                  .map((bookDetail, i) => (
                    <li key={bookDetail._id}>
                      <div className="CardMain">
                        <Card>
                          <Container>
                            <CardBody>
                              <Row>
                                <Col s="3">
                                  <img
                                    src={bookDetail.picture}
                                    alt={`"${bookDetail.title}-cover"`}
                                  />
                                  {/* <img src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`}/> */}
                                </Col>
                                <Col s="9">
                                  <CardTitle>
                                    <span>
                                      <strong>Title:</strong>
                                    </span>{" "}
                                    {bookDetail.title}
                                  </CardTitle>
                                  <CardTitle>
                                    <span>
                                      <strong>Author:</strong>
                                    </span>{" "}
                                    {bookDetail.author}
                                  </CardTitle>
                                  <CardSubtitle>
                                    <span>
                                      <strong>Genre:</strong>
                                    </span>{" "}
                                    {bookDetail.genre}
                                  </CardSubtitle>
                                  <CardText >
                                    <span><strong>Status:</strong></span> {bookDetail.status}
                                  </CardText>
                                </Col>
                              </Row>
                              <Button
                                size="sm"
                                tag={Nlink}
                                to={`/book-detail/${bookDetail._id}`}
                                className="library-books-btn"
                              >
                                See details
                              </Button>
                              {this.state.role === "admin" && (
                                <DeleteBook
                                  onDelete={() => this.handleDeleteBook()}
                                  bookToBeDeletedId={bookDetail._id}
                                  bookDetail={bookDetail}
                                />
                              )}

                              {bookDetail._currentOwner &&
                                bookDetail._currentOwner !==
                                  "000000000000000000000000" && (
                                  <div>
                                    <br />
                                    <Alert color="warning">
                                      This book is not available at the moment -
                                      It has been borrowed.
                                    </Alert>
                                  </div>
                                )}
                            </CardBody>
                          </Container>
                        </Card>
                      </div>
                      <br />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    Promise.all([
      api.getLibrary(this.props.match.params.libraryId),
      api.getMember(this.props.match.params.libraryId)
    ])
      .then(([response, member]) => {
        console.log("response------->", response);
        this.setState({
          library: response.library,
          book: response.book,
          role: member[0].role
        });
        console.log("ARE YOU AN ADMIN?? ROLE:", this.state.role);
        console.log("currentOwner-------->", this.state.book[0]._currentOwner);
      })
      .catch(err => console.log(err));
  }
}
