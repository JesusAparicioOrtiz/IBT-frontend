import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import checkLogIn from "../lib/checkLogIn";


const LoginForm = () => {
    return (
        <div className="wrapper">
            <h1>Login</h1>
            <Container>
                <Form onSubmit = {checkLogIn}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                        <Button variant="primary" type="submit" className="centerbutton"> Submit </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default LoginForm;