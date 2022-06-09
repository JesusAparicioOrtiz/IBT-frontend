import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import addCity from "../lib/addCity";
import NavigationBar from './Navigationbar';


const CityForm = () => {
    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Add City</h1>
            <Container>
                <Form onSubmit = {addCity}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="city" className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="Enter city" />
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