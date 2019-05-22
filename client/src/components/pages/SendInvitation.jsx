import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import api from "../../api";

export default class SendInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
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
      name: this.state.name,
      email: this.state.email,
    };

    if (data.name === "" || data.email === "") {
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
      .sendInvitation(this.props.match.params.libraryId, data)
      .then(response => {
        console.log("THIS IS THE RESPONSEEEE", response);
        this.setState({
          feedback: `Your email was sent! You'll be redirected`
        });
        setTimeout(() => {
          this.setState({
            feedback: null
          });
        this.props.history.push(`/libraries/${this.props.match.params.libraryId}`)
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
    }
  }

  render() {
    return (
      <div className="AddBook">
        <h2>Invite friends to join this library</h2>
        <form>
          What's your friend's name?{" "}
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          And your friend's e-mail?{" "}
          <Input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <Button color="primary" onClick={e => this.handleSubmit(e)}>
            Invite
          </Button>
        </form>
        {this.state.feedback && (
          <div className="info">{this.state.feedback}</div>
        )}
      </div>
    );
  }
}