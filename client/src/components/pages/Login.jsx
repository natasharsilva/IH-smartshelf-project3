import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import api from '../../api';


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
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
    api.login(this.state.email, this.state.password)
      .then(result => {
        this.props.history.push("/profile") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login">
      <div className="container">
        <h2>login</h2>
        <Form>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input type="text" value={this.state.email} name="email" onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} />
        </FormGroup>
          <Button tag="a" onClick={(e) => this.handleClick(e)} className="btn-yellow-fill">Login</Button>
        </Form>
        <p>Don't have an account yet? <a href="/signup"><span className="badge badge-warning">Signup</span></a></p>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
      </div>
    );
  }
}
