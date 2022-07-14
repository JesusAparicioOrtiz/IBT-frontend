import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import logIn from "../lib/logIn";


const LoginForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const username = e.target.username.value;
        const password = e.target.password.value;
        logIn(username, password).then((res) => {
            setLoading(false);
            window.location.href = '/map';
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }
    
    return (<>
        <div className="wrapper">
            <h1>Log in</h1>
            <Container>
                <Form onSubmit = {handleSubmit}>
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
                        <Button variant="primary" type="submit" className="centerbutton mb-3"> Submit </Button>
                        </Col>
                    </Row>
                    {loading?<Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>:null}
                </Form>
            </Container>
        </div>
        </>
    );
};

export default LoginForm;