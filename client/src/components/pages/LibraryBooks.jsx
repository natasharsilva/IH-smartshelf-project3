import React, { Component } from 'react';
import { Button } from 'reactstrap';
import api from '../../api';

export default class LibraryBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
          response: {
            library: {},
            book: {}
          },
          member:[],
        }
      }

  render() {
    return (
      <div className="LibraryBooks">
      {!this.state.book && <div>Loading...</div>}
      {this.state.book && 
        <div>
        <Button color="primary">Go Back to My Library</Button>
      <h1>Library Name: {this.state.library.name}</h1>
        <h2>List of Books / Book Details</h2>
        <input type="text" className="input" placeholder="Search..." />
        <Button color="primary">ADD BOOK</Button><br />
         
           
           {/* <h3>{this.state.boo}</h3> */}
           <ul>
        {this.state.book.map(bookDetail => 
        <li key={bookDetail._id}>
          Title:{bookDetail.title}
          </li>)}
        </ul>
         </div> }
      </div>
    )
  }

  componentDidMount() {
    // console.log(this.props.match)
    api.getLibrary(this.props.match.params.libraryId)
    
      .then(response => {
        console.log("response------->",response)
        this.setState({
          library: response.library,
          book: response.book
        })
      })
      .catch(err => console.log(err))
  }


}
