import React from "react";
import { Button, Alert } from "reactstrap";
import api from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
      <div>
        {this.state.showDeleteAlert ? (
          <Button
            color="danger"
            onClick={this.showDeleteAlert}
            className="library-books-btn"
          > 
          <FontAwesomeIcon icon={faTrash} size="1x" className="icon"/>{' '}Delete
          </Button>
        ) : (
          <Alert color="info">
            Are you sure you want to delete this book?
            <br />
            <Button onClick={this.deleteBook} className="btn btn-danger">
              Delete
            </Button>
            <Button
              onClick={this.showDeleteAlert}
              className="library-books-btn"
            >
              No!
            </Button>
          </Alert>
        )}
      </div>
    );
  }
}
