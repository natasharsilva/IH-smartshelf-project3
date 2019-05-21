import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import api from "../../api";

export default class ReportProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="ReportProblem">
        <h2>Report a problem with this book</h2>
        <form>
          Name:{" "}
          <Input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Subject:{" "}
          <Input
            type="email"
            name="email"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Message:{" "}
          <Input
            type="textarea"
            name="message"
            cols="20"
            rows="5"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <Button color="primary" onClick={e => this.sendEmail(e)}>
            Send
          </Button>
        </form>
        {this.state.message && <div className="info">{this.state.message}</div>}
      </div>
    );
  }
}