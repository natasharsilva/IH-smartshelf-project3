import React, { Component } from 'react';
import api from '../../api';

export default class Countries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: {
        library: {},
        book: {},
      },
      member:[],
    }
  }
  render() {
    return (
      <div className="LibraryDetail">
        <div className="LibraryHeader">
        <h1>Library Name</h1>
      
        </div>
        <h2>List of countries</h2>
        {this.state.countries.map(c => <li key={c._id}>{c.name}</li>)}
      </div>
    );

  }
  componentDidMount() {
    api.getLibrary(this.state.libraryId)
      .then(response => {
        console.log(response)
        this.setState({
          countries: response
        })
      })
      .catch(err => console.log(err))
  }
}