import React, {useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import addCity from "../lib/addCity";
import searchCity from "../lib/searchCity";
import NavigationBar from './Navigationbar';
import Select from 'react-select'


const CityForm = () => {
    
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCity = cities.filter(x => x.value === selectedValue.value)[0];

        delete selectedCity.label;
        selectedCity.name = selectedCity.value;
        delete selectedCity.value;
        addCity(e, selectedCity);
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }
    
    const getCities = (e) => {
        e.preventDefault();
        searchCity(e,city).then(res => {
            res.map(city => {
                setCities(cities => [...cities, {value: city.name, label: city.name, latitude: city.latitude, longitude: city.longitude}]);
            });
        })
    };


    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Add City</h1>
            <Container className="mt-4">
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={9} md={5} lg={5}>
                            <Form.Group controlId="city" className="mb-3" onChange={handleChangeCity}>
                                <Form.Control type="text" placeholder="Enter city" minLength="3" maxLength="30"/>
                            </Form.Group>
                            <Select
                                    defaultValue={selectedValue}
                                    onChange={setSelectedValue}
                                    options={cities}
                                    placeholder={cities.length == 0 ? 'No city searched' : 'Select place...'}
                                    noOptionsMessage={() => "No city searched"}
                                    className="mb-3"
                                />
                        </Col>
                        <Col xs={1} md={1} lg={1}>
                            <Button variant="primary" type="button" className="centerbutton" onClick={getCities}> Search </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="description" className="mb-3">
                                <Form.Control type="text" placeholder="Enter a description" minLength="10" maxLength="300"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="date" className="mb-3">
                                <Form.Control type="date" placeholder="Enter date" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                        <Button variant="primary" type="submit" className="centerbutton"> Submit </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
        </>
    );
};

export default CityForm;