import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Row,
  Col,
  Container
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'
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
                            <CardBody>
                            <Container>
                              <Row>
                                <Col s='3'>
                                  <CardImg
                                    src={bookDetail.picture}
                                    alt={`"${bookDetail.title}-cover"`}
                                    className='imgCard'
                                  />
                                  {/* <img src={bookDetail.picture} alt={`"${bookDetail.title}-cover"`}/> */}
                                </Col>
                                <Col s="9">
                                  <CardTitle>
                                  <strong>{bookDetail.title}</strong>
                                  </CardTitle>
                                  <CardSubtitle>
                                      <strong>Author:</strong>{" "}
                                    {bookDetail.author}
                                  </CardSubtitle>
                                  <CardSubtitle>
                                    <span>
                                      <strong>Genre:</strong>{" "}
                                    </span>
                                    {bookDetail.genre}
                                  </CardSubtitle>
                                  <CardText >
                                  {bookDetail._currentOwner &&
                                bookDetail._currentOwner !==
                                  "000000000000000000000000" && (
                                  <div>
                                    <span style={{color:'red',fontWeight:'bold'}}>
                                    <FontAwesomeIcon icon={faTimesCircle} size="1x" className="icon"/>{' '}Unavailable
                                    </span>
                                  </div>
                                )}
                                  </CardText>
                                </Col>
                              </Row>
                              </Container>
                              <Container>
                              <Row>
                                <Col>
                              <Button
                                // size="sm"
                                tag={Nlink}
                                to={`/book-detail/${bookDetail._id}`}
                                className="library-books-btn"
                              >
                                See details
                              </Button>
                              </Col>
                              <Col>
                              {/* <br /> */}
                              {this.state.role === "admin" && (
                                <DeleteBook
                                  onDelete={() => this.handleDeleteBook()}
                                  bookToBeDeletedId={bookDetail._id}
                                  bookDetail={bookDetail}
                                />
                              )}
                              </Col>
                              </Row>
                              </Container>
                            </CardBody>
                          
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
        this.setState({
          library: response.library,
          book: response.book,
          role: member[0].role
        });
        window.scrollTo(0, 0);
      })
      .catch(err => console.log(err));
  }
}
