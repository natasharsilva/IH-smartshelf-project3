import React, { Component } from "react";
import api from "../../api";
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
          this.toggleAlertLeaveLibrary()
        })     
      })
    })
  }

//  ---------- METHOD TO DELETE MEMBER AS AN ADMIN -------------------
  deleteMemberADMIN(memberToBeDeletedId) {
    api.deleteMember(memberToBeDeletedId)
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
              allmembers: memberInfo
            })
          this.toggleAlertDeleteMember()
        })     
      })
    .catch(err => console.log(err))      
    })
  }
  //  ---------- METHOD TO DELETE LIBRARY AS AN ADMIN -------------------

  deleteLibrary() {
    api.deleteLibrary(this.props.match.params.libraryId)
      .then(response => {
        console.log("THE LIBRARY WAS DELETED!", response )
        this.props.history.push('/profile')
      })
      .catch(err => console.log(err))      
  }

// ----------------------
  render() {
    return (
      <div className="LibraryDetail">
        {!this.state.library  &&  <div>Loading...</div>}
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

              {this.state.member && this.state.member.role === "admin" && <Button onClick={this.toggleAlertDeleteLibrary} className="btn btn-danger">Delete Library</Button>}
              <Alert color="info" isOpen={this.state.showAlertDeleteLibrary} toggle={this.toggleAlertDeleteLibrary}>
                Are you sure you want to delete this library? <br />
                  <Button onClick={(e) => this.deleteLibrary(e)} className="btn btn-danger">Delete!</Button>  
                  <Button onClick={this.toggleAlertDeleteLibrary} className="btn btn-info">No!</Button>     
                </Alert>
              
              {!this.state.member && <Button onClick={(e) => this.joinLibrary(e)} className="btn btn-info">Join</Button>}
              {this.state.member && this.state.member.role === "member" && <Button onClick={this.toggleAlertLeaveLibrary} className="btn btn-info">Leave</Button>}
              <Alert color="info" isOpen={this.state.showAlertLeaveLibrary} toggle={this.toggleAlertLeaveLibrary}>
              Are you sure you want to leave this library? <br />
                  <Button onClick={(e) => this.leaveLibrary(e)} className="btn btn-danger">Leave!</Button>  
                  <Button onClick={this.toggleAlertLeaveLibrary} className="btn btn-info">Stay!</Button>     
                </Alert>
            {this.state.member && (
              <Button href={`/send-invitation/${this.state.library._id}`} className="btn btn-info">
                Send Invitation
              </Button>
            )}

            </CardBody>
            </Col>
            </Row>
            {this.state.role === "admin" && <EditLibrary updateLibrary={this.updateLibrary} theLibrary={this.state.library} />}
          </Card>
        </div>
      }
        <h3>Available Books</h3>
        {!this.state.book && <div>Loading...</div>}
        {this.state.book &&
          this.state.book.slice(0, 2).map((booksFromLibrary, i) => (
            <div key={booksFromLibrary._id}>
              <Card>
                <Row>
                  <Col>
                    <CardImg top width="100%" src={booksFromLibrary.picture} alt="Card image cap"
                    />
                  </Col>
                  <Col>
                    <CardBody>
                      <CardTitle>
                        <b>{booksFromLibrary.name}</b>
                      </CardTitle>
                      <CardSubtitle>{booksFromLibrary.author}</CardSubtitle>
                      <CardText>{booksFromLibrary.description}</CardText>
                      <Button size="sm" tag={Nlink} to={`/book-detail/${booksFromLibrary._id}`} className="btn btn-info">
                        See details
                      </Button>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        <Button outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/books`}>
          {" "}
          See all Books
        </Button>
        <Button outline color="info" size="sm" tag={Nlink} to={`/${this.props.match.params.libraryId}/add-book`}>
          {" "}
          Add new Book
        </Button>

        <div className="memberList">
        <h2>Members</h2>
        {this.state.allmembers && this.state.allmembers.map((members,i) => (<div key={members._id}>
             <Card>
              <Row>
                <Col>
                  <CardImg top width="100%" src={members._user.picture} alt="Card image cap" />
                </Col>
                <Col>
                  <CardBody>
                    <CardTitle><b>{members._user.username}</b></CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <CardText></CardText>
                    <Button size="sm" tag={Nlink}to={`/profile/${members._user._id}`} className="btn btn-info">See details</Button>
                    {this.state.member && this.state.member.role === "admin" && 
                    <Button size="sm"onClick={() =>this.toggleAlertDeleteMember()} className="btn btn-danger">Delete Member</Button>}
                     {this.state.showAlertDeleteMember &&
                     <Alert color="info" isOpen={() =>this.state.showAlertDeleteMember()}>
                          Are you sure you want to delete this member? <br />
                        <Button size="sm" onClick={(e) => this.deleteMemberADMIN(members._id)} className="btn btn-danger">Delete!</Button>  
                        <Button size="sm" onClick={this.toggleAlertDeleteMember} className="btn btn-info">No!</Button>     
                      </Alert>}                    
                  </CardBody>
                </Col>
              </Row>
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
          api.getAllMember(this.props.match.params.libraryId)
        ]).then(([memberInfo,allmembers]) => {
             this.setState({
               member: memberInfo[0],
               allmembers: allmembers
          })
          console.log("THIS IS THE LOGGED MEMBER:", this.state.member)
          console.log('THERE ARE THE MEMBERS-------->',this.state.allmembers)
        })     
      })
      .catch(err => console.log(err));
  }
}
