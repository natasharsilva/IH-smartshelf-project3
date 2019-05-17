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
      profileInfo: null,
      showEditForm: false
    };
  }
  showEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
   
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
               


                </CardBody>
                  <EditProfile /> 
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Libraries</CardTitle>
                  <CardText className="infoContainer">
                  {this.state.profileInfo.members.length < 1 && 
                    <span>You are not part of any libraries yet!<br /> Create one or find libraries near you</span>
                  }
                  {this.state.profileInfo.members &&
                    this.state.profileInfo.members.map((library, i) => (
                      <li key={library._library._id}>
                          <img
                            src={library._library.picture}
                            alt=""
                          />
                          <Link to={`/libraries/${library._library._id}`}>
                            {library._library.name}
                          </Link>
                      </li>
                    ))}
                  </CardText>
                  <Link to="/">Show more</Link>
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
                  {this.state.profileInfo.books.length < 1 && 
                    <span>You haven't borrowed books yet!<br /> Check your libraries to start reading</span>
                  }
                  {this.state.profileInfo.books && 
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
                            <Button href="/" outline color="info" size="sm">
                              Return to library
                            </Button>
                          </span>
                        </li>
                      ))}
                  </CardText>
                  <Link to="/">Show more</Link>
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
