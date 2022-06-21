import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import addCity from "../lib/addCity";
import NavigationBar from './Navigationbar';


const CityForm = () => {
    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Add City</h1>
            <Container className="mt-4">
                <Form onSubmit = {addCity}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="city" className="mb-3">
                                <Form.Control type="text" placeholder="Enter city" minLength="3" maxLength="30"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="description" className="mb-3">
                                <Form.Control type="text" placeholder="Enter a description" minLength="10" maxLength="300"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="date" className="mb-3">
                                <Form.Control type="date" placeholder="Enter date" />
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
        </>
    );
};

export default CityForm;