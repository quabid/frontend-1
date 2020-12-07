// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavDropdown,
} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { logout } from '../actions/UserActions';

const Header = ({ branding }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    console.log('logout');
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="transparent" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <NavbarBrand className="font-weight-bolder">{branding}</NavbarBrand>
          </LinkContainer>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? (
                <LinkContainer to="/profile">
                  <NavDropdown title={userInfo.email} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/contacts">
                      <NavDropdown.Item>My Contacts</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/newcontact">
                      <NavDropdown.Item>Add Contact</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/logout">
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <NavLink>
                    <i className="fas fa-user"></i> Sign In
                  </NavLink>
                </LinkContainer>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
