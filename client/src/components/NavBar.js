import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import api from "../api";
import { NavLink as Nlink } from "react-router-dom";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogoutClick(e) {
    api.logout();
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          {/* <NavbarBrand href="/">Project3</NavbarBrand> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Nlink} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && (
                  <NavLink tag={Nlink} to="/profile">
                    Profile
                  </NavLink>
                )}
              </NavItem>
              <NavItem>

                <NavLink tag={Nlink} to="/add-library">Add Library</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Nlink} to="/libraries/:libraryId">Library Detail</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Nlink} to="/:libraryId/books">Library Books</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Nlink} to="/:libraryId/add-book">Add Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Nlink} to="/books/:bookId">Book Detail</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Nlink} to="/map">Map</NavLink>
              </NavItem>
              <NavItem>
          {!api.isLoggedIn() && <NavLink tag={Nlink} to="/login">Login</NavLink>}

              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && (
                  <NavLink tag={Nlink} to="/signup">
                    Signup
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && (
                  <NavLink
                    tag={Nlink}
                    to="/"
                    onClick={e => this.handleLogoutClick(e)}
                  >
                    Logout
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
