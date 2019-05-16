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
        book: null
      }
    };
    this.borrowBook = this.borrowBook.bind(this);
  }
  borrowBook() {}

  render() {
    return (
      <div className="BookDetail">
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
                  <Button onClick={this.borrowBook} className="btn btn-info">
                    Borrow
                  </Button>
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
        this.setState({
          book: response
        });
      })
      .catch(err => console.log(err));
  }
}
