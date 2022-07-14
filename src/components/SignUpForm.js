import React, {useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import createUser from "../lib/createUser";

const data = [{ value:'English', label: 'English' },
            { value: 'Español', label: 'Español' },
            { value:'French', label: 'French' }];

const animatedComponents = makeAnimated();

const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);

    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createUser(e, selectedValue).then((res) => {
            setLoading(false);
            window.location.href = '/';
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }
    

    return (
        <div className="wrapper">
            <h1>Sign Up</h1>
            <Container>
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username..." minLength="5" maxLength="20"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password..." minLength="8" maxLength="64"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="password2" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password..." minLength="8" maxLength="64"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email..." />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name..." minLength="3" maxLength="20"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="surname" className="mb-3">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" placeholder="Enter surname..." minLength="3" maxLength="20"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="Languages" className="mb-3">
                                <Form.Label>Languages</Form.Label>
                                <Select
                                    value={data.filter(obj => selectedValue.includes(obj.value))}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={handleChange}
                                    isMulti
                                    options={data}
                                    className="mb-3"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Button variant="primary" type="submit" className="mb-3"> Submit </Button>
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
    );
};

export default SignUpForm;