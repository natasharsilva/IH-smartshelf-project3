import React, { Component } from 'react';
import api from '../../api';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col,Alert } from 'reactstrap';
  import {NavLink as Nlink} from 'react-router-dom';

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
        this.showMore = this.showMore.bind(this);
      }

  handleClick(event) {
    event.preventDefault()
    let libraryId ={ _library: this.props.match.params.libraryId._id    }
    api.createMember(libraryId)
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
  showMore() {
    console.log("NOTICE MEEEEEE",this.state.book.length)
    this.state.itemsToShow === 2 ? (
      this.setState({ itemsToShow: this.state.book.length, expanded: true })
    ) : (
      this.setState({ itemsToShow: 2, expanded: false })
    )
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
              <Button onClick={(e) => this.handleClick(e)}className="btn btn-info">Join</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>
        </div>
      }
          <h3>Available Books</h3>
        {!this.state.book && <div>Loading...</div>}
        {this.state.book && this.state.book.slice(0,this.state.itemsToShow).map((booksFromLibrary,i) => (<div key={booksFromLibrary.id}>
        
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
          <Button className="btn btn-primary" onClick={this.showMore}>
          {this.state.expanded ? 
          (<span>Show less</span>) : (<span>Show more</span>)
          }</Button>.
          <Button tag={Nlink} to={`/:${this.props.match.params.libraryId}/books`}> See all Books</Button>
          

          <h3>Feed</h3>
              {/* comments & notifications - NEED TO SEE HOW TO SHOW ONLY A FEW 
              AND SORT BY RECENT, MAYBE SORT BY TIMESTAMPS AND SHORTEN THE LENGTH ?? */} 
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
        </div>))
      }
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
    })
    .catch(err => console.log(err))
  }
}

