  
import React, { Component } from "react";
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faComment, faExclamationTriangle,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
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
  Col,
  Container
} from "reactstrap";
import Rating from '../Rating'
import AddReview from "./AddReview"

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
        _currentOwner: this.state.user._id,
        borrowedDate: Date.now(),
        comments: this.state.book.comments,
        status: "Unavailable",
        showReviewForm: false
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
  renderReviewForm  =() => {
    this.setState({
      showReviewForm: !this.state.showReviewForm
    })
  }

  render() {
    return (
      <div className="BookDetail">
        {!this.state.book && <div>Loading...</div>}
        {this.state.book && (
          <div className="bookCard">
            <Card>
            <CardBody>
           
                  <CardImg
                    body
                    src={this.state.book.picture}
                    alt="Card image cap"
                    style={{width:'100px',objectFit:'cover',marginBottom:'10px'}}
                  />
                
                  <CardTitle className="text-center" tag="h4">
                    <strong>{this.state.book.title}</strong>
                  </CardTitle>
                  <CardSubtitle  className="text-center" tag="h6"><i>by {this.state.book.author}</i></CardSubtitle>
                  <CardText className="text-center">
                    
                    <strong>Rating: </strong>
                    {this.state.book.rating}/5
                    <br />
                    <strong>Pages: </strong>
                    {this.state.book.pages}
                    <br />
                    <strong>ISBN: </strong>
                    {this.state.book.isbn}
                    <br />
                    <strong>Genre: </strong>
                    {this.state.book.genre}
                    
                  </CardText>
                   
                  {this.state.book.description}
                  <br />
                  {this.state.book.status === "Available" && (
                    <Button
                      onClick={e => this.borrowBook(e)}
                      outline
                      className="btn-yellow-fill"
                    >
                      <FontAwesomeIcon icon={faBook} size="1x" className="icon"/>{' '}borrow this book
                    </Button>
                  )}
                  {this.state.book.status === "Unavailable" && 
                        <div><br /><Alert color="warning" >This book is not available at the moment - it has been borrowed.</Alert></div> }
                  <br />
                  <Button onClick={this.renderReviewForm} className="btn-yellow-outline">
                  <FontAwesomeIcon icon={faComment} size="1x" className="icon"/>{' '}add a review</Button>
                  {this.state.showReviewForm && 
                  <AddReview onToggle={this.renderReviewForm} theInfo={this.state.response} />}
                  <Button href={`/report-problem/${this.state.book._library}`} className="btn-problem" size="sm"
                  >
                  <FontAwesomeIcon icon={faExclamationTriangle} size="1x" className="icon"/>{' '}Report a problem
                  </Button>
                  
                  <Button href={`/profile`} className="btn-yellow-fill">
                  <FontAwesomeIcon icon={faArrowLeft} size="1x" className="icon"/>{' '}Go Back
                  </Button><br />
                  {this.state.message && (
                    <div className="info">{this.state.message}</div>
                  )}
                </CardBody>
            </Card>
            <br />
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
          book: response.response,
          response:response
        });
      })
      .catch(err => console.log(err));
  }
}