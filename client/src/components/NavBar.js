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
        <Navbar style={{backgroundColor: '#662D91'}} dark expand="md">
          {/* <NavbarBrand href="/">Project3</NavbarBrand> */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Nlink} onClick={this.toggle} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                {api.isLoggedIn() && (
                  <NavLink tag={Nlink} onClick={this.toggle} to="/profile">
                    Profile
                  </NavLink>
                )}
              </NavItem>
              <NavItem>
          {!api.isLoggedIn() && <NavLink tag={Nlink} onClick={this.toggle} to="/login">Login</NavLink>}

              </NavItem>
              <NavItem>
                {!api.isLoggedIn() && (
                  <NavLink tag={Nlink} onClick={this.toggle} to="/signup">
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
