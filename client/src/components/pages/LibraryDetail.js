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

export default class LibraryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        library: {},
        book: {}
      }
    };
    this.joinLibrary = this.joinLibrary.bind(this);
  }
  joinLibrary() {}

  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library && <div>Loading...</div>}
        {/* If `this.state.pokemons` is truthy (an array) */}
        {this.state.library && (
          <div className="libraryCard">
            <Card>
              <Row>
                <Col>
                  <CardImg
                    top
                    width="100%"
                    src={this.state.library.picture}
                    alt="Card image cap"
                  />
                </Col>
                <Col>
                  <CardBody>
                    <CardTitle>
                      <b>{this.state.library.name}</b>
                    </CardTitle>
                    <CardSubtitle>{this.state.library.address}</CardSubtitle>
                    <CardText>{this.state.library.description}</CardText>
                    <Button onClick={this.joinLibrary} className="btn btn-info">
                      Join
                    </Button>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </div>
        )}
        <h3>Available Books</h3>
        {!this.state.book && <div>Loading...</div>}
        {this.state.book &&
          this.state.book.map(booksFromLibrary => (
            <div key={booksFromLibrary._id}>
              <Card>
                <Row>
                  <Col>
                    <CardImg
                      top
                      width="100%"
                      src={booksFromLibrary.picture}
                      alt="Card image cap"
                    />
                  </Col>
                  <Col>
                    <CardBody>
                      <CardTitle>
                        <b>{booksFromLibrary.name}</b>
                      </CardTitle>
                      <CardSubtitle>{booksFromLibrary.author}</CardSubtitle>
                      <CardText>{booksFromLibrary.description}</CardText>
                      <Button className="btn btn-info">Join</Button>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        }
      </div>
    );
  }
  componentDidMount() {
    console.log("SETSTATE", this.props.match.params.libraryId);

    api
      .getLibrary(this.props.match.params.libraryId)

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
