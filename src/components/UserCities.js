import React, {useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import removeCity from "../lib/removeCity";
import NavigationBar from './Navigationbar';
import dateFormatter from "../utils/dateFormatter";
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
                let cities = res.data.cities;
                cities.forEach(city => {
                    city.date = dateFormatter(new Date(city.date));
                    console.log(new Date(city.date))
                });
                setUserData(cities);
            })
        }) 
        getUserCities();
    }, []);

    const handleRemoveCity = async (event,cityId) => {
        let succeed = await removeCity(event, cityId);
        succeed ? setUserData(userData.filter(city => city._id !== cityId)) : console.log("Error");
    }

    return (<>
        <NavigationBar />
        <div className="wrapper">
            <Container className="justify-content-center">
            <div class="d-flex justify-content-center">
                <h1>Cities visited</h1>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
            {userData.map((city, idx) => (
                <div class="col d-flex justify-content-center">
                <Toast className="d-inline-block m-1" bg="light" key={idx} onClose={(e) => handleRemoveCity(e,city._id)}>
                <Toast.Header>
                    <strong className="me-auto">{city.name}</strong>
                    <small>Visited in: {city.date}</small>
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