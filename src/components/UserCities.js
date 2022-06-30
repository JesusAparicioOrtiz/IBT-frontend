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
                    city.dateFormatted = dateFormatter(new Date(city.date));
                });
                cities.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })
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
            { userData.length > 0 ? (
                <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {userData.map((city, idx) => (
                    <div class="col d-flex justify-content-center">
                    <Toast className="d-inline-block m-1" bg="light" key={idx} onClose={(e) => handleRemoveCity(e,city._id)}>
                    <Toast.Header>
                        <strong className="me-auto">{city.name}</strong>
                        <small>Visited in: {city.dateFormatted}</small>
                    </Toast.Header>
                    <Toast.Body className='Dark'>
                        <p>{city.description}</p>
                    </Toast.Body>
                    </Toast>
                    </div>
                ))} 
                </div>) : (
                <div class="d-flex justify-content-center">
                    <h2>You have not visited any city yet!</h2>
                </div>
                )}
            </Container>
        </div>
        </>
    );
};

export default UserCities;