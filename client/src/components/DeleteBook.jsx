import React from "react";
import { Button, Alert } from "reactstrap";
import api from "../api";

export default class DeleteBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteAlert: true,
      bookDetail: this.props.bookDetail
    };
    this.showDeleteAlert = this.showDeleteAlert.bind(this);
  }
  //  ---------- METHOD TO DELETE BOOK AS AN ADMIN -------------------
  deleteBook = () => {
    api.deleteBook(this.props.bookToBeDeletedId).then(response => {
      console.log("Book DELETED!", response);
      this.props.onDelete();
    });
  };

  showDeleteAlert() {
    this.setState({
      showDeleteAlert: !this.state.showDeleteAlert
    });
  }

  render() {
    return (
      <div className="editForm">
        {this.state.showDeleteAlert ? (
          <Button
            color="danger"
            onClick={this.showDeleteAlert}
            className="delete-libr-btn"
          >
            Delete
          </Button>
        ) : (
          <Alert color="danger">
            Are you sure you want to delete this book?
            <br />
            <Button onClick={this.deleteBook} className="btn btn-danger">
              Delete
            </Button>
            <Button
              onClick={this.showDeleteAlert}
              className="send-invitation-btn"
            >
              No!
            </Button>
          </Alert>
        )}
      </div>
    );
  }
}
