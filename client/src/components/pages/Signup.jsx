import React, { Component } from 'react';
import { Button } from 'reactstrap'
import api from '../../api';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      username: "",
      password: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <h2>Sign up</h2>
        <form>
          Email <br />
          <input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} /> <br /><br />
          Username <br />
          <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br /><br />
          Password <br />
          <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br /><br />
          <Button tag="a" outline color="info" onClick={(e) => this.handleClick(e)}>Signup</Button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}