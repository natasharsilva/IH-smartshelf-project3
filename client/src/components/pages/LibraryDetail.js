import React, { Component } from 'react';
import api from '../../api';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, Alert } from 'reactstrap';
  import {NavLink as Nlink} from 'react-router-dom';
  import EditLibrary from '../EditLibrary.js';


export default class LibraryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: {
        library: {},
        book: [],
         },
      itemsToShow: 2,
      expanded: false
        }
      }

  handleClick(event) {
    event.preventDefault()
    api.createMember(this.props.match.params.libraryId)
      .then(result => {
        console.log("DID IT WORK???", result)
        this.setState({
          message: `Your book '${this.state.title}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => this.setState({ message: err.toString() }))
  }
    updateLibrary = () => {
      api.getLibrary(this.props.match.params.libraryId)
      .then(response => {
        this.setState({
          library: response.library,
        })
      })
      .catch(err => console.log(err))
    }
  
    

  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library && <div>Loading...</div>}
        {/* If `this.state.pokemons` is truthy (an array) */}
        {this.state.library && 
        <div className="libraryCard">
          <Card>
            <Row>
              <Col>
            <CardImg top width="100%" src={this.state.library.picture} alt="Card image cap" />
              </Col>
              <Col>
            <CardBody>
              <CardTitle><b>{this.state.library.name}</b></CardTitle>
              <CardSubtitle>{this.state.library.address}</CardSubtitle>
              <CardText>{this.state.library.description}</CardText>
              {this.state.role === [] && <Button onClick={(e) => this.handleClick(e)}className="btn btn-info">Join</Button>}
            </CardBody>
            </Col>
            </Row>
            {this.state.role === "admin" && <EditLibrary updateLibrary={this.updateLibrary} theLibrary={this.state.library} />}
          </Card>
        </div>
      }
          <h3>Available Books</h3>
        {!this.state.book && <div>Loading...</div>}
        {this.state.book && this.state.book.slice(0,this.state.itemsToShow).map((booksFromLibrary,i) => (<div key={booksFromLibrary._id}>
        
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
              <Button size="sm" tag={Nlink}to={`/book-detail/${booksFromLibrary._id}`} className="btn btn-info">See details</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>

          </div>))}
          <Button outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/books`}> See all Books</Button>
          <Button  outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/add-book`}> Add new Book</Button>
          

          <h3>Feed</h3>
              {/* comments & notifications - NEED TO SEE HOW TO SHOW ONLY A FEW 
              AND SORT BY RECENT, MAYBE SORT BY TIMESTAMPS AND SHORTEN THE LENGTH ?? */} 
              {!this.state.book && <div>Loading...</div>}
        {this.state.book && this.state.book.map(booksFromLibrary => (
        <div className="activityFeed" key={booksFromLibrary._id}>
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
              <Button outline color="info" size="sm" tag={Nlink}to="/book-detail" className="btn btn-info">See details</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>
        </div>))
      }
      </div>
    );
  }
  componentDidMount() {
    Promise.all([
      api.getLibrary(this.props.match.params.libraryId),
      api.getMember(this.props.match.params.libraryId)
    ]).then(([response,member]) => {
      this.setState({
        library: response.library,
        book: response.book,
        role: member.role

      })
      console.log("WHAT IS YOUR ROLE??", this.state.role)
      console.log("WHAT IS YOUR ROLE??", response, member)

    })
    .catch(err => console.log(err))
  }

}

