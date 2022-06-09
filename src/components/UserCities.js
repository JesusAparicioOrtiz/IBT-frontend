import React, {useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import deleteCity from "../lib/deleteCity";
import NavigationBar from './Navigationbar';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';


const UserCities = () => {

    const [userData, setUserData] = useState([]);

    useEffect( () => { 
        const getUserCities = ( async () => {
            axios.get(`${process.env.REACT_APP_SERVER}/api/v1/user/cities`, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            }
            }).then(res => {
                console.log(res)
                setUserData(res.data.cities);
            })
        }) 
        getUserCities();
    }, []);
    return (<>
        <NavigationBar />
        <div className="wrapper">
            <Container className="justify-content-center">
            <div class="d-flex justify-content-center">
                <h1>Cities</h1>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
            {userData.map((city, idx) => (
                <div class="col d-flex justify-content-center">
                <Toast className="d-inline-block m-1" bg="light" key={idx} onClose={() => deleteCity(city._id)}>
                <Toast.Header>
                    <strong className="me-auto">{city.name}</strong>
                </Toast.Header>
                <Toast.Body className='Dark'>
                    <p>Latitude: {city.latitude}</p>
                    <p>Longitude: {city.longitude}</p>
                </Toast.Body>
                </Toast></div>
            ))}
            </div>
            </Container>
        </div>
        </>
    );
};

export default UserCities;