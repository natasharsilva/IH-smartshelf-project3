import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import api from "../../api";

export default class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      review: "",
      rating: "",
      feedback: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    let data = {
      _user: this.state.user,
      title: this.state.title,
      text: this.state.review,
      rating: this.state.rating
    };

    if (data.title === "" || data.review === "" || data.rating === "") {
      this.setState({
        feedback: `Ops! You need to fill all the fields to send`
      });
      setTimeout(() => {
        this.setState({
          feedback: null
        });
      }, 5000);
    } else {
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
        _currentOwner: this.state.book._currentOwner,
        status: this.state.book.status,
        comments: [...this.state.book.comments, data]
      })
      .then(response => {
        console.log("THIS IS THE RESPONSEEEE", response);
        console.log("THIS IS THE DATA", data)
        console.log("THESE ARE THE COMMENTS", response.comments)
        this.setState({
          feedback: `Your review was added! You'll be redirected`
        });
        setTimeout(() => {
          this.setState({
            feedback: null
          });
        this.props.history.push(`/book-detail/${this.props.match.params.bookId}`)
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
    }
  }

  render() {
    return (
      <div className="AddBook">
        <h2>Add a review to this book</h2>
        <form>
          Review title{" "}
          <Input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Write your review here{" "}
          <Input
            type="textarea"
            name="review"
            value={this.state.review}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Rate this book from 0 to 10{" "}
          <Input
            type="number"
            min="0"
            max="10"
            name="rating"
            value={this.state.rating}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <Button color="primary" onClick={e => this.handleSubmit(e)}>
            Submit review
          </Button>
        </form>
        {this.state.feedback && (
          <div className="info">{this.state.feedback}</div>
        )}
      </div>
    );
  }

  componentDidMount() {
    api
      .getBook(this.props.match.params.bookId)
      .then(response => {
        console.log('THIS IS THE RESPONSE',response)
        this.setState({
          user: response.user,
          book: response.response
        });
        console.log('THIS IS THE STATEEE',this.state)
      })
      .catch(err => console.log(err));
  }
}