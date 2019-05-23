import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
        this.props.history.push("/profile") // Redirect to the profile
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
      <div className="container">
        <h2>sign up</h2>
        <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} /> 
        </FormGroup>
        <FormGroup>
          <Label for="username">Username </Label>
          <Input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> 
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> 
        </FormGroup>
          <Button tag="a" className="btn-yellow-fill" onClick={(e) => this.handleClick(e)}>Sign up</Button>
        </Form>
        <p>Already have an account? <a href="/login"><span className="badge badge-warning">Login</span></a></p>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
      </div>
    );
  }
}