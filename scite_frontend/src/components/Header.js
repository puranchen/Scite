import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../context/UserContext.js'; // Adjust the path accordingly


const Header = () => {
  const { currentUser } = useContext(UserContext);
  console.log("Current user: ", currentUser);

  return (
    <Navbar bg="dark" expand="sm" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <span className="fw-bold">Scite</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item><Nav.Link as={Link} to="/about">About</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/feed">Feed</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/library">Library</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/echo">Echo</Nav.Link></Nav.Item>
          </Nav>
          <Nav className="col justify-content-end">
            {currentUser ? (
              <NavDropdown title={currentUser.email} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Guest" id="guest-dropdown">
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup">Signup</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
