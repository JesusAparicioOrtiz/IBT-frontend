import React, {useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import NavigationBar from './Navigationbar';
import deleteAccount from '../lib/deleteAccount';


const Account = () => {

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
    

    return (
        <>
        <NavigationBar />
        <div className="wrapper">
                <h1 class="mb-4">{userData.username}</h1>
                <Form onSubmit = {deleteAccount} >
                    <Button variant="danger" type="submit">Delete Account</Button>
                </Form>
        </div>
        </>
    );
};

export default Account;