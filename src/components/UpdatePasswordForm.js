import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import updatePassword from "../lib/updatePassword";


const UpdatePasswordForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePassword(e);
    }

    return (
        <div className="wrapper">
            <h1>Profile</h1>
            <Container>
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="oldPassword" className="mb-3">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter old password..."/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="newPassword" className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password..."/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="newPassword2" className="mb-3">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password..."/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Button variant="primary" type="submit"> Update </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default UpdatePasswordForm;