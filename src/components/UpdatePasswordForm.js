import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import updatePassword from "../lib/updatePassword";
import NavigationBar from './Navigationbar';


const UpdatePasswordForm = () => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updatePassword(e).then((res) => {
            setLoading(false);
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }

    return (
        <>
        <NavigationBar />
        <div className="wrapper">
            <h1>Profile</h1>
            <Container>
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="oldPassword" className="mb-3">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter old password..." minLength="8" maxLength="64"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="newPassword" className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter new password..." minLength="8" maxLength="64"/>
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

                    <Row className="justify-content-md-center mb-3">
                        <Col xs={12} md={6} lg={6}>
                            <Button variant="primary" type="submit"> Update </Button>
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

export default UpdatePasswordForm;