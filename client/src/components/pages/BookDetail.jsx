import React, { Component } from "react";
import api from "../../api";
import {
  Alert,
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
import Rating from '../Rating'

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        user: null,
        book: null
      }
    };

    this.calculateDueDate = this.calculateDueDate.bind(this);
    this.untilDueDate = this.untilDueDate.bind(this);
  }

  borrowBook(event) {
    event.preventDefault();
    console.log("THIS IS THE ID LOOOOK", this.props.match.params.bookId);
    api
      .updateBook(this.props.match.params.bookId, {
        title: this.state.book.title,
        author: this.state.book.author,
        genre: this.state.book.genre,
        picture: this.state.book.picture,
        description: this.state.book.description,
        rating: this.state.book.rating,
        pages: this.state.book.pages,
        language: this.state.book.language,
        _currentOwner: this.state.user,
        borrowedDate: Date.now(),
        comments: this.state.book.comments,
        status: "Unavailable"
      })
      .then(result => {
        console.log("DID IT WORK???", result);
        this.setState({
          book: result.response,
          message: `You borrowed '${this.state.book.title}'. You have ${this.untilDueDate()} days to give it back`
        });
      });
  }

  calculateDueDate(){
    if(this.state.book)
      {
    let borrowedDate = this.state.book.borrowedDate ;
    let deadlineDays=30 ;
      var result = new Date(borrowedDate);
      result.setDate(result.getDate() + deadlineDays);
          return result;} else{
      return 0
    }
  }

  untilDueDate(){ //currentDate as parameter?
    if(this.state.book)
      {
     let dueDate = this.calculateDueDate();
     let currentDate = Date.now();
     var oneDay = 1000 * 60 * 60 * 24;

     let dueDateMS = dueDate.getTime();
     let currentDateMS = currentDate;

     let diffMS = Math.abs(currentDateMS-dueDateMS);

     return Math.round(diffMS/oneDay)
      } else {return 0}
  }

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
                  {this.state.book.status === "Available" && (
                    <Button
                      onClick={e => this.borrowBook(e)}
                      outline
                      color="info"
                    >
                      Borrow
                    </Button>
                  )}
                  {this.state.book.status === "Unavailable" && 
                        <div><br /><Alert color="warning" >This book is not available at the moment - it has been borrowed.</Alert></div> }
                  <br />
                  <Button href={`/book-detail/${this.state.book._id}/add-review`} outline color="info">
                    Add a review
                  </Button><br />
                  <Button
                    href={`/report-problem/${this.state.book._library}`}
                    outline
                    color="info"
                    size="sm"
                  >
                    Report a problem
                  </Button>
                  <br />
                  <Button color="primary" href={`/profile`}>
                    Go Back
                  </Button><br />
                  {this.state.message && (
                    <div className="info">{this.state.message}</div>
                  )}
                </CardBody>
              </Row>
            </Card>
            <Card className="reviewContainer">
              <CardBody>
              <CardTitle tag="h4">Reviews</CardTitle>
                <CardText>
                    {this.state.book.comments.map(comment => <li key={comment._id}>
                      <strong>"{comment.title}"</strong><br/>
                      <strong>Author:</strong> {comment.author[0].toUpperCase() + comment.author.substr(1)}<br/>
                      <strong>Review:</strong> {comment.text}<br/>
                      <strong>Rating:</strong> <Rating>{comment.rating}</Rating><br/><br/></li> )}
                    {/* DON'T FORGET TO MAP!!!!!!! */}
                </CardText>
                </CardBody>
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
          user: response.user,
          book: response.response
        });
      })
      .catch(err => console.log(err));
  }
}