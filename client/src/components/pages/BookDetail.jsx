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
        book: null,
      }
    };
    this.borrowBook = this.borrowBook.bind(this);
  }
  borrowBook() {

  }

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
                    <CardTitle>
                      <b>{this.state.book.name}</b>
                    </CardTitle>
                    <CardSubtitle>{this.state.book.address}</CardSubtitle>
                    <CardText>{this.state.book.description}</CardText>
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
        console.log("response------->", response);
        this.setState({
          book: response
        });
      })
      .catch(err => console.log(err));
  }
}