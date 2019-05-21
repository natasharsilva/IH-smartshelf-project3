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
        book: []
      },
      member: null,

      visible: false,
    };
        this.toggleAlert = this.toggleAlert.bind(this);
      }

      toggleAlert() {
        this.setState({ 
          visible: !this.state.visible 
        })
      }

  joinLibrary(event) {
    event.preventDefault()
    api.createMember(this.props.match.params.libraryId)
      .then(result => {
        console.log("CREATED MEMBER", result.role)
        this.setState({
          message: `Your book '${this.state.title}' has been created`,
          member: result
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
  deleteMember() {
    api.deleteMember(this.state.member._id)
    .then(response => {
      console.log("MEMBER DELETED!", response)
      api.getLibrary(this.props.match.params.libraryId)
       .then(response => {
         this.setState({
           library: response.library,
           book: response.book,
         })
         api.getMember(this.props.match.params.libraryId)
           .then(memberInfo => {
             this.setState({
               member: memberInfo[0]
          })
          this.toggleAlert()
        })     

      })
    .catch(err => console.log(err))      
  })
  }
    

  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library &&  <div>Loading...</div>}
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
           
              {!this.state.member && <Button onClick={(e) => this.joinLibrary(e)} className="btn btn-info">Join</Button>}
              {this.state.member && this.state.member.role === "member" && <Button onClick={this.toggleAlert} className="btn btn-info">Leave</Button>}
            
              <Alert color="info" isOpen={this.state.visible} toggle={this.toggleAlert}>
              Are you sure you want to leave this library? <br />
                  <Button onClick={(e) => this.deleteMember(e)} className="btn btn-danger">Leave!</Button>  
                  <Button onClick={this.toggleAlert} className="btn btn-info">Stay!</Button>     
                </Alert>

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
     api.getLibrary(this.props.match.params.libraryId)
       .then(response => {
         this.setState({
           library: response.library,
           book: response.book,
         })
         api.getMember(this.props.match.params.libraryId)
           .then(memberInfo => {
             this.setState({
               member: memberInfo[0]
          })
          
        })     

      })
    .catch(err => console.log(err))      
  }
}



