import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDeck,
  CardText,
  CardTitle, 
  Container, 
  Row, 
  Col
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import api from "../../api";
import EditProfile from "../EditProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: null
    };

    this.calculateDueDate = this.calculateDueDate.bind(this);
    this.untilDueDate = this.untilDueDate.bind(this);
  }

  updateProfile = () => {
    api
      .showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  returnBook(e, book) {
    e.preventDefault();
    api
      .updateBook(book._id, {
        status: "Available",
        _currentOwner: "0".repeat(24)
      })
      .then(result => {
        console.log("DID IT WORK???", result);
        this.setState({
          message: `You returned the book`
        });
        this.updateProfile()
      });
  }

  calculateDueDate(borrowedDate){
    if(this.state.profileInfo.books) {
      // let borrowedDate = this.state.profileInfo.books.borrowedDate ;
      let deadlineDays=30 ;
      var result = new Date(borrowedDate);
      result.setDate(result.getDate() + deadlineDays);
      console.log("####")
      console.log("this.state.profileInfo.books", this.state.profileInfo.books)
      console.log("borrowedDate", borrowedDate)
      console.log("deadlineDays", deadlineDays)
      console.log("result", result)
      console.log("####")
      return result;
    } 
    else{
      return 0
    }
  }

  untilDueDate(borrowedDate){ //currentDate as parameter?
    if(this.state.profileInfo.books)
      {
     let dueDate = this.calculateDueDate(borrowedDate);
     let currentDate = Date.now();
     var oneDay = 1000 * 60 * 60 * 24;

     let dueDateMS = dueDate.getTime();
     let currentDateMS = currentDate;

     let diffMS = dueDateMS-currentDateMS;

     console.log("-----")
     console.log("this.calculateDueDate()", this.calculateDueDate())
     console.log("currentDateMS", currentDateMS)
     console.log("dueDate", dueDate)
     console.log("dueDateMS", dueDateMS)
     console.log("diffMS", diffMS)
     console.log("oneDay", oneDay)

     return Math.round(diffMS/oneDay)
      } else {return 30}
  }

  render() {
    // let showDuedate = 
    // if(Number(this.untilDueDate(book.borrowedDate)) <= 1){
    // showDuedate = <strong>Days Left: </strong> {this.untilDueDate(book.borrowedDate)
    // }
    //   else {
    // showDuedate = <div className="alert danger"><strong>Days Left: </strong>{this.untilDueDate(book.borrowedDate)}</div>
  
    return (
      <div className="profilePage">
        {!this.state.profileInfo && <div>Loading...</div>}
        {this.state.profileInfo && (
          <div>
            <CardDeck>
              <Card>
                <CardBody>
                  <CardText className="userContainer">
                    <span className="userPic">
                      <img src={this.state.profileInfo.user.picture} alt="" />
                      <br />
                      
                    </span>
                    <span>
                      <span className="userName">
                        {this.state.profileInfo.user.username[0].toUpperCase() +
                          this.state.profileInfo.user.username.substr(1)}
                      </span>
                      <br />
                      {this.state.profileInfo.user.favoriteQuote && (
                        <em>"{this.state.profileInfo.user.favoriteQuote}"</em>
                      )}<br/><br />
                      {this.state.profileInfo.user.favoriteBooks && (
                        <span><strong>Favorite book</strong><br/>{this.state.profileInfo.user.favoriteBooks}</span>
                      )}
                    </span>
                  </CardText>
                </CardBody>
                <EditProfile updateProfile={this.updateProfile} />
              </Card>
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Libraries</CardTitle>
                  <div className="infoContainer">
                    {this.state.profileInfo.members.length < 1 && (
                      <span>
                        You are not part of any libraries yet!
                        <br /> Create one or find libraries near you
                      </span>
                    )}
                    {this.state.profileInfo.members.length > 0 &&
                      this.state.profileInfo.members.map(library => (
                        <li key={library._library._id}>
                        <Link to={`/libraries/${library._library._id}`}>
                          
                        <div className="library-cover"
                          style={{background: `url("${library._library.picture}") no-repeat center`,backgroundSize:'cover'}}>
                          <div className="container-opacity" style={{backgroundColor: 'black',backgroundSize:'100%',opacity:'0.5',zIndex: '2'}}>
                          {/* <img src={library._library.picture} alt="" style={{opacity: '0.7'}} /> */}
                          <div style={{color:'white'}}>
                            {library._library.name}
                            </div>
                          </div>
                          </div></Link>
                          
                        </li>
                      ))}
                  </div>
                  {this.state.profileInfo.members.length > 2 && (
                    <Button
                      onClick={this.showMore}
                      outline
                      color="info"
                      size="sm"
                    >
                      {this.state.expanded ? (
                        <span>Show less</span>
                      ) : (
                        <span>Show more</span>
                      )}
                    </Button>
                  )}

                  <Container>
                  <Row style={{flexDirection:'row'}}>
                    <Col >
                      <Button className="add-library-button btn" href="/add-library">
                      <FontAwesomeIcon icon={faPlus} size="1x" className="icon"/> Add library
                      </Button>
                      </Col>
                      <Col >
                      <Button  className="find-libraries-button btn" href="/find-libraries"  >
                      <FontAwesomeIcon icon={faSearchLocation} size="1x" className="icon"/> Find libraries
                      </Button>
                    </Col>
                  </Row>
                  </Container>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Books</CardTitle>
                  <CardText className="infoContainer">
                    {this.state.profileInfo.books.length < 1 && (
                      <span>
                        You haven't borrowed books yet!
                        <br /> Check your libraries to start reading
                      </span>
                    )}
                    {this.state.profileInfo.books.length > 0 &&
                      this.state.profileInfo.books.map(book => (
                        <li key={book._id}>
                          <img src={book.picture} alt="" />
                          <span>
                            <strong>Title: </strong>
                            {book.title}
                            <br />
                            <strong>Author: </strong>
                            {book.author}
                            <br />

    {  !(Number(this.untilDueDate(book.borrowedDate)) < 1) ? 
        <div><strong>Days Left: </strong> {this.untilDueDate(book.borrowedDate)}</div> :
                    <div className="alert alert-danger">
                      You reached you deadline! Return the book. <strong>You're{' '}  
                      {Math.abs(Number(this.untilDueDate(book.borrowedDate)))} 
                      {' '} days overdue</strong></div>}

                              <br /> 
                            <Button
                              onClick={e => this.returnBook(e, book)}
                              key={book._id}
                              outline
                              color="info"
                              size="sm"
                            >
                              Return to library
                            </Button>
                          </span>
                        </li>
                      ))}
                  </CardText>
                  {this.state.profileInfo.members.length > 2 && (
                    <Button
                      onClick={this.showMore}
                      outline
                      color="info"
                      size="sm"
                    >
                      {this.state.expanded ? (
                        <span>Show less</span>
                      ) : (
                        <span>Show more</span>
                      )}
                    </Button>
                  )}
                </CardBody>
              </Card>
            </CardDeck>
            <ButtonGroup vertical>
              <Button href="/" outline color="info">
                Home
              </Button>
              <Button href="/logout" outline color="info">
                Logout
              </Button>
            </ButtonGroup>

          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    
    api
      .showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        });
      })
      .catch(err => console.log(err));
      
      
  }
}