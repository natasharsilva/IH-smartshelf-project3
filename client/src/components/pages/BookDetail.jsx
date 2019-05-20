import React, { Component } from "react";
import api from "../../api";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from "reactstrap";

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        user: null,
        book: null
      }
    };
  }

  borrowBook(event) {
    event.preventDefault();
    api.updateBook(this.props.match.params.bookId, {
    title: this.state.book.title,
    author: this.state.book.author,
    genre: this.state.book.genre,
    picture: this.state.book.picture,
    description: this.state.book.description,
    rating: this.state.book.rating,
    pages: this.state.book.pages,
    language: this.state.book.language,
    _currentOwner: this.state.user,
    status: 'Unavailable'
    })
    .then(result => {
      console.log("DID IT WORK???", result)
      this.setState({
        message: `Your book '${this.state.book.title}' has been borrowed by ${this.state.book._currentOwner}`
      })
    })
  }

  addReview() {}

  render() {
    return (
      <div>
        {!this.state.book && <div>Loading...</div>}
        {this.state.book && (
          <div className="bookCard">
            <Card>
              <Row>
                <Col>
                  <CardImg
                    top
                    width="100%"
                    src={this.state.book.picture}
                    alt="Card image cap"
                  />
                </Col>
                <CardBody>
                  <CardTitle tag="h3">
                    <strong>{this.state.book.title}</strong>
                  </CardTitle>
                  <CardSubtitle tag="h4">{this.state.book.author}</CardSubtitle>
                  <CardText>
                    {this.state.book.description}
                    <br />
                    <strong>Rating: </strong>
                    {this.state.book.rating}
                    <br />
                    <strong>Pages: </strong>
                    {this.state.book.pages}
                    <br />
                    <strong>ISBN: </strong>
                    {this.state.book.isbn}
                    <br />
                  </CardText>
                  {this.state.book.status === 'Available' && <Button onClick={(e) => this.borrowBook(e)} outline color="info">
                    Borrow
                  </Button>}<br />
                  <Button onClick={this.addReview} outline color="info">
                    Add a review
                  </Button><br />
                  <Button onClick={this.reportProblem} outline color="info">
                    Report a problem
                  </Button><br />
                </CardBody>
              </Row>
            </Card>
          </div>
        )}
      </div>
    );
  }
  componentDidMount() {
    api
      .getBook(this.props.match.params.bookId)
      .then(response => {
        console.log(response)
        this.setState({
          user: response.user,
          book: response.response
        });
        console.log('STATE BOOK', this.state.book)
        console.log('STATE USER', this.state.user)
      })
      .catch(err => console.log(err));
  }
}
