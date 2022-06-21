import React, {useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import updateProfile from "../lib/updateProfile";
import axios from 'axios';
import NavigationBar from './Navigationbar';

const data = [{ value:'English', label: 'English' },
            { value: 'Español', label: 'Español' },
            { value:'French', label: 'French' }];

const animatedComponents = makeAnimated();


const Profile = () => {

    const [selectedValue, setSelectedValue] = useState([]);
    const [userData, setUserData] = useState([]);

    const handleChange = (e) => {
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(e, selectedValue);
    }

    useEffect( () => { 
        const getUserData = ( async () => {
            axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/profile`, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            }
            }).then(res => {
                setUserData(res.data.user);
                setSelectedValue(res.data.user.languages);
            })
        }) 
        getUserData();
    }, []);
    

    return (
        <>
        <NavigationBar />
        <div className="wrapper">
            <h1>Profile</h1>
            <h3>{userData.username}</h3>
            <Container>
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username..." defaultValue={userData.username} minLength="5" maxLength="20"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email..." defaultValue={userData.email} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name..." defaultValue={userData.name} minLength="3" maxLength="20"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="surname" className="mb-3">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" placeholder="Enter surname..." defaultValue={userData.surname} minLength="3" maxLength="20"/>
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
                        <Col xs={3} md={3} lg={3}>
                            <Button variant="primary" type="submit"> Update </Button>
                        </Col>
                        <Col xs={3} md={3} lg={3}>
                            <a href="/updatePassword"> <Button variant="primary">Update Password</Button> </a>
                        </Col>
                    </Row>
                </Form>
                <br/>
            </Container>
        </div>
        </>
    );
};

export default Profile;