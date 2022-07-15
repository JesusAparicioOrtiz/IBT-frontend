import React, {useState} from "react";
import {  Container, Navbar, Nav, NavDropdown, Form, Button, Row, Col} from "react-bootstrap";
import logout from "../lib/logout";


const Navigationbar = (props) => {

    return (
                <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid>
                {localStorage.getItem('user') ? 
                    <Navbar.Brand href="/map">IBT</Navbar.Brand>: <Navbar.Brand href="/">IBT</Navbar.Brand>
                }
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown title="Places" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/addCity">Add Place</NavDropdown.Item>
                        <NavDropdown.Item href="/userCities">My Places</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/forumSearch" className="me-2">Forum</Nav.Link>
                    {props.dateFilters ? props.dateFilters() : null}
                    {props.lineFilter ? <>
                        <Navbar.Brand className="ms-2">
                            Lines:
                        </Navbar.Brand>
                        <div className="d-flex align-items-center">
                        {props.lineFilter()}
                        </div>
                        </>
                        : null
                    }
                    </Nav>
                    <Nav >
                    {localStorage.getItem('user') ? 
                        <NavDropdown title={localStorage.getItem('username')} id="collasible-nav-dropdown" align="end">
                            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
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