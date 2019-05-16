import React, { Component } from 'react';
import api from '../../api';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,Alert } from 'reactstrap';
  import {NavLink as Nlink} from 'react-router-dom';




export default class LibraryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        library: {},
        book: {}
      }
    }
    this.joinLibrary = this.joinLibrary.bind(this)
  }

  joinLibrary() {
    let libraryId ={ _library: this.state.library._id}
    api.createMember(libraryId)
    .then(response => {
      console.log("response------->",response)
    })
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library && <div>Loading...</div>}
        {/* If `this.state.pokemons` is truthy (an array) */}
        {this.state.library && this.state.library.map(booksFromLibrary => (

          <div className="libraryCard">
            <Card>
            <Row>
              <Col>
            <CardImg top width="100%" src={booksFromLibrary.picture} alt="Card image cap" />
              </Col>
              <Col>
            <CardBody>
              <CardTitle><b>{booksFromLibrary.name}</b></CardTitle>
              <CardSubtitle>{booksFromLibrary.author}</CardSubtitle>
              <CardText>{booksFromLibrary.description}</CardText>
              <Button size="sm" tag={Nlink}to="/book-detail" className="btn btn-info">See details</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>
          </div>))}

          <h3>Feed</h3>
              {/* comments & notifications - NEED TO SEE HOW TO SHOW ONLY A FEW 
              AND SORT BY RECENT, MAYBE SORT BY TIMESTAMPS AND SHORTEN THE LENGHT ?? */} 
              {!this.state.book && <div>Loading...</div>}
        {this.state.book && this.state.book.map(booksFromLibrary => (
        
        <div className="activityFeed" key={booksFromLibrary.id}>
        {this.state.book.status === "Unavailable" && 
         <Alert color="danger">
         {booksFromLibrary.name} is now available in the library
        </Alert>}
       {this.state.book.status === "Available" && 
         <Alert color="primary">
         {booksFromLibrary.name} was taken from the library by {booksFromLibrary._currentOwner}
        </Alert>}
              <Card>
            <Row>
              <Col>
            <CardImg top width="100%" src={booksFromLibrary.picture} alt="Card image cap" />
              </Col>
              <Col>
            <CardBody>
              <CardTitle><b>{booksFromLibrary.name}</b></CardTitle>
              <CardSubtitle>{booksFromLibrary.comments.rating}</CardSubtitle>
              <CardText>{booksFromLibrary.comments.text}</CardText>
              <Button size="sm" tag={Nlink}to="/book-detail" className="btn btn-info">See details</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>

        </div>))}
          

      </div>
    );
  }
  
  componentDidMount() {
    console.log("SETSTATE",this.props.match.params.libraryId)
    api.getLibrary(this.props.match.params.libraryId)
    .then(response => {
      this.setState({
        library: response.library,
        book: response.book
      })
      .catch(err => console.log(err));
  })
}
}

