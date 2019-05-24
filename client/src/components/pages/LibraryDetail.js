import React, { Component } from "react";
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Alert
} from "reactstrap";
import { NavLink as Nlink } from "react-router-dom";
import EditLibrary from "../EditLibrary.js";
import DeleteMember from "../DeleteMember";



export default class LibraryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        library: {},
        book: []
      },
      member: null,
      allmembers: null,
      showAlertLeaveLibrary: false,
      showAlertDeleteLibrary: false,
      showAlertDeleteMember: false,
      profileInfo: null

    };
        this.toggleAlertLeaveLibrary = this.toggleAlertLeaveLibrary.bind(this);
        this.toggleAlertDeleteLibrary = this.toggleAlertDeleteLibrary.bind(this);
        this.toggleAlertDeleteMember = this.toggleAlertDeleteMember.bind(this);

      }
      toggleAlertLeaveLibrary() {
        this.setState({ 
          showAlertLeaveLibrary: !this.state.showAlertLeaveLibrary,
        })
      }
      toggleAlertDeleteLibrary() {
        this.setState({ 
          showAlertDeleteLibrary: !this.state.showAlertDeleteLibrary,
        })
      }
      toggleAlertDeleteMember() {
        this.setState({ 
          showAlertDeleteMember: !this.state.showAlertDeleteMember,
        })
      }
// ---------- METHOD TO THE USER BECOME A MEMBER OF THE LIBRARY
  joinLibrary(event) {
    event.preventDefault();
    api
      .createMember(this.props.match.params.libraryId)
      .then(result => {
        console.log("CREATED MEMBER", result.role);
        this.setState({
          message: `Your book '${this.state.title}' has been created`,
          member: result
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }
  updateLibrary = () => {
    api
      .getLibrary(this.props.match.params.libraryId)
      .then(response => {
        this.setState({
          library: response.library
        });
      })
      .catch(err => console.log(err))
    }
  //  ---------- METHOD TO LEAVE LIBRARY  -------------------

  leaveLibrary() {
    api.deleteMember(this.state.member._id, this.props.match.params.libraryId)
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
          this.toggleAlertLeaveLibrary()
        })     
      })
    })
  }

//  ---------- METHOD TO DELETE MEMBER AS AN ADMIN -------------------
  // deleteMemberADMIN(memberToBeDeletedId, ) {
  //   api.deleteMember(memberToBeDeletedId, this.props.match.params.libraryId)
  //   .then(response => {
  //     console.log("MEMBER DELETED!", response)
  //     api.getLibrary(this.props.match.params.libraryId)
  //      .then(response => {
  //        this.setState({
  //          library: response.library,
  //          book: response.book,
  //        })
  //        api.getMember(this.props.match.params.libraryId)
  //          .then(memberInfo => {
  //            this.setState({
  //             allmembers: memberInfo
  //           })
  //         this.toggleAlertDeleteMember()
  //       })     
  //     })
  //   .catch(err => console.log(err))      
  //   })
  // }
  //  ---------- METHOD TO DELETE LIBRARY AS AN ADMIN -------------------

  deleteLibrary() {
    api.deleteLibrary(this.props.match.params.libraryId)
      .then(response => {
        console.log("THE LIBRARY WAS DELETED!", response )
        this.props.history.push('/profile')
      })
      .catch(err => console.log(err))      
  }
  handleDeleteMember(indexToRemove) {
    this.setState({
      allmembers: this.state.allmembers.filter((member,i) => i !== indexToRemove)
    })
  }

// ----------------------
  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library  &&  <div>Loading...</div>}
        {this.state.library && 
        <div className="libraryCard">
        <img src={this.state.library.picture} alt="library-img" className="library-pic" />
          <Card>
            {/* <CardImg top width="100%" src={this.state.library.picture} alt="Card image cap" className="library-pic" /> */}
            <CardBody>
              <CardTitle><b>{this.state.library.name}</b></CardTitle>
              <CardSubtitle>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" className="icon"/>{' '}
              {this.state.library.address}</CardSubtitle>
              <CardText>{this.state.library.description}</CardText>

            {this.state.member && (
              <Button href={`/send-invitation/${this.state.library._id}`} className="send-invitation-btn">
                Send Invitation
              </Button>
            )}

              {this.state.member && this.state.member.role === "admin" && <Button onClick={this.toggleAlertDeleteLibrary} className="delete-libr-btn">
              <FontAwesomeIcon icon={faTrash} size="1x" className="icon"/>{' '}
                Delete Library</Button>}
              <Alert color="info" isOpen={this.state.showAlertDeleteLibrary} toggle={this.toggleAlertDeleteLibrary}>
                Are you sure you want to delete this library? <br />
                  <Button onClick={(e) => this.deleteLibrary(e)} className="send-invitation-btn">Delete!</Button>  
                  <Button onClick={this.toggleAlertDeleteLibrary} className="send-invitation-btn">No!</Button>     
                </Alert>
              
              {!this.state.member && <Button onClick={(e) => this.joinLibrary(e)} className="send-invitation-btn">Join</Button>}
              {this.state.member && this.state.member.role === "member" && <Button onClick={this.toggleAlertLeaveLibrary} className="delete-libr-btn">Leave</Button>}
              <Alert color="info" isOpen={this.state.showAlertLeaveLibrary} toggle={this.toggleAlertLeaveLibrary}>
              Are you sure you want to leave this library? <br />
                  <Button onClick={(e) => this.leaveLibrary(e)} className="delete-libr-btn">Leave!</Button>  
                  <Button onClick={this.toggleAlertLeaveLibrary} className="send-invitation-btn">Stay!</Button>     
                </Alert>

            </CardBody>
          
            {this.state.member && this.state.member.role === "admin" &&  
            <EditLibrary updateLibrary={this.updateLibrary} theLibrary={this.state.library} />}
          </Card>
        </div>
      }
        <h3>Library Books</h3>
        {!this.state.book && <div>Loading...</div>}
        
        {this.state.book && this.state.book.length > 0 ? 
        this.state.book.slice(0, 2).map((booksFromLibrary, i) => (
          <div key={booksFromLibrary._id}>
            <Card>
            <CardBody>
              <Row>
                <Col s='3'>
                  <CardImg top width="100%" src={booksFromLibrary.picture} alt="Card image cap"
                  style={{maxWidth:'50px'}}/>
                </Col>
                <Col s='9'>
                  <CardTitle>{booksFromLibrary.title}</CardTitle>
                  <CardSubtitle>{booksFromLibrary.author}</CardSubtitle>
                  {/* <CardText className="small" style={{overflow:'auto'}}>{booksFromLibrary.description}</CardText> */}
                </Col>
                </Row>
                  <Button size="sm" tag={Nlink} to={`/book-detail/${booksFromLibrary._id}`} className="send-invitation-btn">
                    See details
                  </Button>
                </CardBody>
            </Card>
          </div>
        ))
        :
        <div className="NoBooks">
        <Card>
              <Col>
                <CardImg top width="100%" src="../../images/SadPup.jpg" alt="Card image cap" className="book-pic"
                />
              </Col>
              <Col>
                <CardBody>
                  <CardTitle>
                    There are currently no books at this library!
                  </CardTitle>
                </CardBody>
              </Col>
          </Card>
    </div>}
    
        {this.state.book && this.state.book.length > 0 && 
        <Button className="send-invitation-btn" outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/books`}>
          {" "}
          See all Books
        </Button>}
        <Button className="send-invitation-btn" outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/add-book`}>
          {" "}
          Add new Book
        </Button>
        <div className="memberList">
        <h3>Members</h3>
        {this.state.allmembers && this.state.allmembers.map((members,i) => (<div key={members._id}>
             <Card>
             <CardBody>
              <Row>
                <Col xs="3">
                  <CardImg top width="100%" src={members._user.picture} alt="Card image cap" />
                </Col>
                <Col xs="9">
                  
                    <CardTitle><b>{members._user.username[0].toUpperCase()+members._user.username.substr(1)}</b></CardTitle>
                    <CardText className="small">"<i>{members._user.favoriteQuote}</i>"</CardText>
                    {/* <Button size="sm" tag={Nlink}to={`/profile/${members._user._id}`}  className="send-invitation-btn small">See details</Button> */}
                    {this.state.member && 
                    this.state.member.role === "admin" && 
                    members._user._id !== this.state.profileInfo.user._id &&                    
                      <DeleteMember onDelete={() => this.handleDeleteMember(i)} memberToBeDeletedId={members._id} theLibrary={this.state.library}/>}
                 
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>))}
        </div>
       
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
      Promise.all([
          api.getMember(this.props.match.params.libraryId),
          api.getAllMember(this.props.match.params.libraryId),
          api.showProfile()
        ]).then(([memberInfo,allmembers,profileInfo]) => {
             this.setState({
               member: memberInfo[0],
               allmembers: allmembers,
               profileInfo: profileInfo
          })
          console.log("PLEASE LET ME KNOW IF THESE ARE THE SAME?", this.state.member._user._id, this.state.profileInfo.user._id)
          console.log("THIS IS THE LOGGED MEMBER:", this.state.member)
          console.log('THERE ARE THE MEMBERS-------->',this.state.allmembers)
        })     
      })
      .catch(err => console.log(err));
  }
}