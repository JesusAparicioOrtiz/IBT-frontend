import React from "react";
import {  Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import logout from "../lib/logout";


const Navigationbar = () => {
    return (
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                {localStorage.getItem('user') ? 
                    <Navbar.Brand href="/map">IBT</Navbar.Brand>: <Navbar.Brand href="/">IBT</Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    {/* <Nav.Link href="/addCity">Add City</Nav.Link> */}
                    <NavDropdown title="Cities" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/addCity">Add City</NavDropdown.Item>
                        <NavDropdown.Item href="/userCities">My Cities</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav >
                    {localStorage.getItem('user') ? 
                        <NavDropdown title={localStorage.getItem('username')} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown> :
                        <Nav>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/singup">Signup</Nav.Link>
                        </Nav>
                    }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
    );
};

export default Navigationbar;