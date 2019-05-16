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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null
    };
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
                      <br />"
                      <em>{this.state.profileInfo.user.favoriteQuote}</em>"
                    </span>
                  </CardText>
                  <Button outline color="info" size="sm" href="/edit-profile">
                    Edit Profile
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Libraries</CardTitle>
                  <CardText className="infoContainer">
                    {this.state.profileInfo.members.map(library => (
                      <li key={library._library._id}>
                        <img
                          src={library._library.picture}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover"
                          }}
                          alt=""
                        />
                        <Link to={`/libraries/${library._library._id}`}>
                          {library._library.name}
                        </Link>
                      </li>
                    ))}
                  </CardText>
                  <Link to="/">Show more</Link>
                  <Button href="/libraries" outline color="info" size="sm">
                    Add library
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Books</CardTitle>
                  <CardText className="infoContainer">
                    {this.state.profileInfo.books.map(book => (
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
                          <Button href="/" outline color="info" size="sm">
                            Return to library
                          </Button>
                        </span>
                      </li>
                    ))}
                  </CardText>
                </CardBody>
              </Card>
            </CardDeck>
            <ButtonGroup vertical>
              <Button href="/" outline color="info">Find Libraries</Button>
              <Button href="/" outline color="info">Home</Button>
              <Button href="/logout" outline color="info">Logout</Button>
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
