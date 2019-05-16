import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import api from '../../api';


export default class AddLibrary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      picture: "",
      address: "",
      description: "",
      message: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFileChange(event) {
    console.log("The file added by the user is: ", event.target.files[0])
    this.setState({
      picture: event.target.files[0]
    })
  }


  handleClick(event) {
    event.preventDefault()
    console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      picture: this.state.picture,
      address: this.state.address,
      description: this.state.description,
    }
    api.createLibrary(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          picture: "",
          address: "",
          description: "",
          message: `Your library '${this.state.name}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }



  render() {
    return (
      <div className="AddLibrary">
        <h2>Add Library</h2>
        <form>
          Name: <Input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          Picture: <Input type="file" value={this.state.picture} name="picture" onChange={this.handleFileChange} /> <br />
          Address: <Input type="text" value={this.state.address} name="address" onChange={this.handleInputChange} /> <br />
          Description: <Input type="textarea" value={this.state.description} name="description" cols="20" rows="5" onChange={this.handleInputChange} /> <br />
          <Button color="primary" onClick={(e) => this.handleClick(e)}>Create Library</Button>
        </form>
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
}