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

    const handleRemoveCity = (event,cityId) => {
        if(window.confirm("Do you want to remove this place?")) {
            removeCity(event, cityId).then((res) => {
                if(res) {
                    setUserData(userData.filter(city => city.id !== cityId));
                } else {
                    alert("Error removing city");
                }
            }).catch(err => {
                if(err) {
                    alert("Error removing city");
                }
            });
        }
    }

    return (<>
        <NavigationBar />
        <div className="wrapper">
            <Container className="justify-content-center">
            <div className="d-flex justify-content-center">
                <h1>Places visited</h1>
            </div>
            { userData.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {userData.map((city, idx) => (
                    <div className="col d-flex justify-content-center" key={idx}>
                    <Toast className="d-inline-block m-1" bg="light" onClose={(e) => handleRemoveCity(e,city.id)}>
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
                <div className="d-flex justify-content-center">
                    <h2>You have not visited any city yet!</h2>
                </div>
                )}
            </Container>
        </div>
        </>
    );
};

export default UserCities;