import React, { Component } from 'react';
import api from '../../api';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col, } from 'reactstrap';



export default class LibraryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      libraryInfo: null
    }
  }


  render() {

    return (
      <div className="LibraryDetail">
        {!this.state.libraryInfo && <div>Loading...</div>}
        {/* If `this.state.pokemons` is truthy (an array) */}
        {this.state.libraryInfo && 
        <div className="libraryCard">
          <Card>
            <Row>
              <Col>
            <CardImg top width="100%" src={this.state.libraryInfo.library.picture} alt="Card image cap" />
              </Col>
              <Col>
            <CardBody>
              <CardTitle><b>{this.state.libraryInfo.library.name}</b></CardTitle>
              <CardSubtitle>{this.state.libraryInfo.library.address}</CardSubtitle>
              <CardText>{this.state.libraryInfo.library.description}</CardText>
              <Button className="btn btn-info">Join</Button>
            </CardBody>
            </Col>
            </Row>
          </Card>
        </div>
      }
          <h2>Available Books</h2>
          {this.state.libraryInfo.books.map(booksFromLibrary => (<div key={booksFromLibrary.id}>
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
              <Button className="btn btn-info">Join</Button>
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
        libraryInfo: response
      })
      
    })
    .catch(err => console.log(err))
  }
}