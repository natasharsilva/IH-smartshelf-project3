import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import LibraryDetail from './pages/LibraryDetail.js';
import LibraryBooks from './pages/LibraryBooks.jsx';
import AddLibrary from './pages/AddLibrary.jsx';
import AddBook from './pages/AddBook.jsx';
import BookDetail from './pages/BookDetail';
import NavBar from './NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import Profile from './pages/Profile';

export default class App extends Component {
  // constructor(props) {
  //   super(props)

  // }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
      <NavBar />
          {/* <h1 className="App-title">Project 3</h1> */}
        
          {/* <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/countries">Countries</NavLink>
          <NavLink to="/add-country">Add country</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        <NavLink to="/secret">Secret</NavLink> */}

        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/libraries" component={AddLibrary} />
          <Route path="/libraries/:libraryId" component={LibraryDetail} />
          <Route path="/:libraryId/books" component={LibraryBooks} />
          <Route path="/add-library" component={AddLibrary} />
          <Route path="/:libraryId/add-book" component={AddBook} />
          <Route path="/books/:bookId" component={BookDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}