import React, { Component } from "react";
import { Button } from "reactstrap";
import api from "../../api";

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileInfo: null,
    }
  }
  render() {
    return (
      <div className="profilePage">
        {!this.state.profileInfo && <div>Loading...</div>}
        {this.state.profileInfo &&
        <div>
        <div>
          <p>Picture</p>
          <img src="/" alt="" />
          <p>E-mail</p>
          <h3>Username</h3>
          <p>Favorite Quote</p>
          <Button outline color="info" size="sm">
            Edit Profile
          </Button>
        </div>
        <div>
        <h3>Libraries</h3>
        <ul>
        {this.state.profileInfo.members.map(library => <li key={library._id}>{library._library.name}</li>)}
        </ul>
        </div>
        <div>
        <h3>Books</h3>
        <ul>
        {this.state.profileInfo.books.map(book => <li key={book._id}>{book.title}, by {book.author}</li>)}
        </ul>
        </div>
        </div>}
      </div>
    );
  }
  componentDidMount() {
    api.showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        })
        console.log(this.state)
      })
      .catch(err => console.log(err))
  }
}
