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
    console.log("IS IT YOU, FATHER COMPONENT??",this.props.theInfo)

    let data = {
      _user: this.props.theInfo.user._id,
      author: this.props.theInfo.user.username,
      title: this.state.title,
      text: this.state.review,
      rating: this.state.rating
    };

    if (data.title === "" || data.review === "" || data.rating === "") {
      this.setState({
        feedback: `Whooops! You need to fill all the fields to send`
      });
      setTimeout(() => {
        this.setState({
          feedback: null
        });
      }, 5000);
    } else {
      api
        .updateBook(this.props.theInfo.response._id, {
          title: this.props.theInfo.response.title,
          author: this.props.theInfo.response.author,
          genre: this.props.theInfo.response.genre,
          picture: this.props.theInfo.response.picture,
          description: this.props.theInfo.response.description,
          rating: this.props.theInfo.response.rating,
          pages: this.props.theInfo.response.pages,
          language: this.props.theInfo.response.language,
          _currentOwner: this.props.theInfo.response._currentOwner,
          status: this.props.theInfo.response.status,
          comments: [...this.props.theInfo.response.comments, data]
        })
        .then(response => {
          this.setState({
            feedback: `Your review was added!`
          });
          this.props.onToggle()
          this.props.onAddReview()
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
          Rate this book from 0 to 5{" "}
          <Input
            type="number"
            min="0"
            max="5"
            maxLength="1"
            name="rating"
            value={this.state.rating}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <Button color="primary" onClick={e => this.handleSubmit(e)}>
            Submit review
          </Button>
          <Button color="primary" onClick={() => this.props.onToggle()}>
            Back
          </Button>
        </form>
        {this.state.feedback && (
          <div className="info">{this.state.feedback}</div>
        )}
      </div>
    );
  }
}
