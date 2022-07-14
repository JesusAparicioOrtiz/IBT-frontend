import React, {useState, useEffect } from "react";
import { Button, Form, Spinner, Row, Col } from "react-bootstrap";
import axios from 'axios';
import NavigationBar from './Navigationbar';
import deleteAccount from '../lib/deleteAccount';


const Account = () => {

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect( () => { 
        const getUserData = ( async () => {
            axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/profile`, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            },
            validateStatus: false
            }).then(res => {
                if (res.status === 200) {
                    setUserData(res.data.user);
                } else {
                    alert(res.data.message);
                }
            })
        }) 
        getUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        deleteAccount(e).then((res) => {
            setLoading(false);
            window.location.href = '/';
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }

    return (
        <>
        <NavigationBar />
        <div className="wrapper">
                <h1 class="mb-4">{userData.username}</h1>
                <Form onSubmit = {handleSubmit} >
                    <Button variant="danger" type="submit">Delete Account</Button>
                    {loading?<Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Spinner animation="border" variant="primary" />
                        </Col>
                    </Row>:null}
                </Form>
        </div>
        </>
    );
};

export default Account;