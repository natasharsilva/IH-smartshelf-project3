import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardDeck,
  CardText,
  CardImg,
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
      profileInfo: null,
      expandedLibraries: false,
      expandedBooks: false,
      librariesToShow: 2,
      booksToShow: 2


    };

    this.calculateDueDate = this.calculateDueDate.bind(this);
    this.untilDueDate = this.untilDueDate.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShowBooks = this.toggleShowBooks.bind(this);


  }
  toggleShow() {
    this.state.librariesToShow === 2 ? (
      this.setState({ librariesToShow: this.state.profileInfo.members.length, expanded: true })
    ) : (
      this.setState({ librariesToShow: 2, expanded: false })
    )
  }
  toggleShowBooks() {
    console.log("WHAT IS THIS", this.state)
    this.state.booksToShow === 2 ? (
      this.setState({ booksToShow: this.state.profileInfo.books.length, expandedBooks: true })
    ) : (
      this.setState({ booksToShow: 2, expandedBooks: false })
    )
  }

  updateProfile = () => {
    api
      .showProfile()
      .then(response => {
        this.setState({
          profileInfo: response
        });
      })
      .catch(err => console.log(err));
  };

  returnBook(e, book) {
    e.preventDefault();
    api.getBook(book._id)
    .then(response => {
      api
      .updateBook(book._id, {
        status: "Available",
        _currentOwner: "0".repeat(24),
        comments: response.response.comments
      })
      .then(result => {
        this.setState({
          message: `You returned the book`
        });
        this.updateProfile()
      });
    })
  }

  calculateDueDate(borrowedDate){
    if(this.state.profileInfo.books) {
      // let borrowedDate = this.state.profileInfo.books.borrowedDate ;
      let deadlineDays=30 ;
      var result = new Date(borrowedDate);
      result.setDate(result.getDate() + deadlineDays);
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

     return Math.round(diffMS/oneDay)
      } else {return 30}
  }

  render() {
    return (
      <div className="profilePage">
        {!this.state.profileInfo && <div>Loading...</div>}
        {this.state.profileInfo && (
          <div>
          <span className="userPic">
            <img src={this.state.profileInfo.user.picture} alt="" />
            <br />
          </span>
        <CardDeck>
          <Card>
            <CardBody>
              <CardText className="userContainer">
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
            <EditProfile theProfile={this.state.profileInfo} updateProfile={this.updateProfile} />
          </Card>
          <Card>
            <CardBody className="libraryContainer">
              <CardTitle tag="h3" className="libraryName">My Libraries</CardTitle>
              <div>
                {this.state.profileInfo.members.length < 1 && (
                  <span>
                    You are not part of any libraries yet!
                    <br /> Create one or find libraries near you
                  </span>
                )}
                {this.state.profileInfo.members.length > 0 &&
                  this.state.profileInfo.members.slice(0,this.state.librariesToShow).map(library => (
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
                <Button onClick={this.toggleShow} className="btn-yellow-fill btn" size="sm">
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
                  <Button className="add-library-button" href="/add-library">
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
                  <CardTitle tag="h3" className="bookName">Books I borrowed</CardTitle>   
                {this.state.profileInfo.books.length < 1 && (
                  <span>
                    You haven't borrowed books yet!
                    <br /> Check your libraries to start reading
                  </span>
                )}

                {this.state.profileInfo.books.length > 0 &&
                  this.state.profileInfo.books.slice(0,this.state.booksToShow).map(book => (
                    
                    <li key={book._id}>
                   
                    <CardText className="infoContainer"></CardText>
                    <Container><Row>
                    <Col s='3'>
                      <CardImg top width="100%" src={book.picture} alt="Card image cap"
                  style={{maxWidth:'130px'}}/>
                      </Col>
                      <Col s='9'>
                      <span>
                        <strong>Title: </strong>
                        {book.title}
                        <br />
                        <strong>Author: </strong>
                        {book.author}
                        <br />

            {  !(Number(this.untilDueDate(book.borrowedDate)) < 1) ? 
                <div><strong>Days Left: </strong> {this.untilDueDate(book.borrowedDate)}</div> :
                            <div className="alert alert-danger small">
                  You reached you deadline! Return the book. <strong>You're{' '}  
                  {Math.abs(Number(this.untilDueDate(book.borrowedDate)))} 
                  {' '} days overdue</strong></div>}
                          </span>
                          </Col>
                        </Row></Container>
                        <Button
                          onClick={e => this.returnBook(e, book)}
                          key={book._id}
                          outline
                          className="return-book-button"
                        >
                          Return Book to library
                        </Button>
                      
                    </li>
                  ))}
             
              {this.state.profileInfo.books.length > 2 && (
                <Button onClick={this.toggleShowBooks} className="add-library-button btn"
                >
                  {this.state.expandedBooks ? (
                    <span>Show less books</span>
                  ) : (
                    <span>Show more books</span>
                  )}
                </Button>
              )}
            </CardBody>
          </Card>
        </CardDeck>
            <ButtonGroup vertical>
              <Button href="/" outline color="warning">
                Home
              </Button>
              <Button href="/logout" outline color="warning">
                Logout
              </Button>
            </ButtonGroup>
            <br />

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
        console.log(this.state.profileInfo.user)

      })
      .catch(err => console.log(err));
  }
}