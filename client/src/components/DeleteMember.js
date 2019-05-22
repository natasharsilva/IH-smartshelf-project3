import React from "react";
import {
  Button,
  Alert,
} from "reactstrap";
import api from "../api";

export default class DeleteMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     showDeleteAlert: true,
     libraryId: this.props.theLibrary._id


    }
    this.showDeleteAlert = this.showDeleteAlert.bind(this)
  }
  //  ---------- METHOD TO DELETE MEMBER AS AN ADMIN -------------------
  deleteMemberADMIN = () => {
    api.deleteMember(this.props.memberToBeDeletedId, this.state.libraryId)
    .then(response => {
      console.log("MEMBER DELETED!", response)
      this.props.onDelete()
    })
  }
  
  showDeleteAlert() {
    this.setState({
      showDeleteAlert: !this.state.showDeleteAlert
    });
  }

  render() {
    return (
      <div className="editForm">

      {this.state.showDeleteAlert ? 
      <Button onClick={this.showDeleteAlert} className="btn btn-danger">Remove</Button>
     : 
      <Alert color="danger">
        Are you sure you want to remove this member?<br />
        <Button onClick={this.deleteMemberADMIN} outline color="danger">Delete!</Button>  
        <Button onClick={this.showDeleteAlert} outline color="danger">No!</Button>  
      </Alert>}
    </div>
    )
  }
}