import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDeck,
  CardText,
  CardTitle
} from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../api";
import EditProfile from "../EditProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null
    };
  }

  updateProfile = () => {
    api
      .showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  returnBook(e, book) {
    e.preventDefault();
    api
      .updateBook(book._id, {
        status: "Available",
        _currentOwner: "0".repeat(24)
      })
      .then(result => {
        console.log("DID IT WORK???", result);
        this.setState({
          message: `You returned the book`
        });
        this.updateProfile()
      });
  }

  render() {
    return (
      <div className="profilePage">
        {!this.state.profileInfo && <div>Loading...</div>}
        {this.state.profileInfo && (
          <div>
            <CardDeck>
              <Card>
                <CardBody>
                  <CardText className="userContainer">
                    <span className="userPic">
                      <img src={this.state.profileInfo.user.picture} alt="" />
                      <br />
                      {this.state.profileInfo.user.email}
                    </span>
                    <span>
                      <span className="userName">
                        {this.state.profileInfo.user.username[0].toUpperCase() +
                          this.state.profileInfo.user.username.substr(1)}
                      </span>
                      <br />
                      {this.state.profileInfo.user.favoriteQuote && (
                        <em>"{this.state.profileInfo.user.favoriteQuote}"</em>
                      )}<br/><br />
                      {this.state.profileInfo.user.favoriteBooks && (
                        <span><strong>Favorite book</strong><br/>{this.state.profileInfo.user.favoriteBooks}</span>
                      )}
                    </span>
                  </CardText>
                </CardBody>
                <EditProfile updateProfile={this.updateProfile} />
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Libraries</CardTitle>
                  <CardText className="infoContainer">
                    {this.state.profileInfo.members.length < 1 && (
                      <span>
                        You are not part of any libraries yet!
                        <br /> Create one or find libraries near you
                      </span>
                    )}
                    {this.state.profileInfo.members.length > 0 &&
                      this.state.profileInfo.members.map(library => (
                        <li key={library._library._id}>
                          <img src={library._library.picture} alt="" />
                          <Link to={`/libraries/${library._library._id}`}>
                            {library._library.name}
                          </Link>
                        </li>
                      ))}
                  </CardText>
                  {this.state.profileInfo.members.length > 2 && (
                    <Button
                      onClick={this.showMore}
                      outline
                      color="info"
                      size="sm"
                    >
                      {this.state.expanded ? (
                        <span>Show less</span>
                      ) : (
                        <span>Show more</span>
                      )}
                    </Button>
                  )}
                  <Button href="/add-library" outline color="info" size="sm">
                    Add library
                  </Button>
                  <Button href="/" outline color="info" size="sm">
                    Find libraries
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Books</CardTitle>
                  <CardText className="infoContainer">
                    {this.state.profileInfo.books.length < 1 && (
                      <span>
                        You haven't borrowed books yet!
                        <br /> Check your libraries to start reading
                      </span>
                    )}
                    {this.state.profileInfo.books.length > 0 &&
                      this.state.profileInfo.books.map(book => (
                        <li key={book._id}>
                          <img src={book.picture} alt="" />
                          <span>
                            <strong>Title: </strong>
                            {book.title}
                            <br />
                            <strong>Author: </strong>
                            {book.author}
                            <br />
                            <strong>Due date: </strong> XXXX <br />
                            <Button
                              onClick={e => this.returnBook(e, book)}
                              key={book._id}
                              outline
                              color="info"
                              size="sm"
                            >
                              Return to library
                            </Button>
                          </span>
                        </li>
                      ))}
                  </CardText>
                  {this.state.profileInfo.members.length > 2 && (
                    <Button
                      onClick={this.showMore}
                      outline
                      color="info"
                      size="sm"
                    >
                      {this.state.expanded ? (
                        <span>Show less</span>
                      ) : (
                        <span>Show more</span>
                      )}
                    </Button>
                  )}
                </CardBody>
              </Card>
            </CardDeck>
            <ButtonGroup vertical>
              <Button href="/" outline color="info">
                Home
              </Button>
              <Button href="/logout" outline color="info">
                Logout
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    api
      .showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
}