import React, {useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import addCity from "../lib/addCity";
import searchCity from "../lib/searchCity";
import NavigationBar from './Navigationbar';
import Select from 'react-select'


const CityForm = () => {
    
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(selectedValue.length === 0) {
            alert('Please select a place');
            setLoading(false);
            return;
        }
        const selectedCity = cities.filter(x => x.value === selectedValue.value)[0];

        delete selectedCity.label;
        selectedCity.name = selectedCity.value;
        delete selectedCity.value;
        addCity(e, selectedCity).then((res) => {
            setLoading(false);
            window.location.href = '/map';
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    }
    
    const getCities = (e) => {
        e.preventDefault();
        searchCity(e,city).then(res => {
            res.map(x => {
                setCities(cities => [...cities, {value: x.name, label: x.name, latitude: x.latitude, longitude: x.longitude}]);
            });
            if (res.length > 0) {
                setSelectedValue({value: res[0].name, label: res[0].name, latitude: res[0].latitude, longitude: res[0].longitude});
            }
        });
    };


    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Add Place</h1>
            <Container className="mt-4">
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={9} md={5} lg={5}>
                            <Form.Group controlId="city" className="mb-3" onChange={handleChangeCity}>
                                <Form.Control type="text" placeholder="Enter place" minLength="3" maxLength="30"/>
                            </Form.Group>
                            <Select
                                    value={selectedValue}
                                    onChange={setSelectedValue}
                                    options={cities}
                                    placeholder={cities.length == 0 ? 'No place searched' : 'Select place...'}
                                    noOptionsMessage={() => "No place searched"}
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
                    <Row className="justify-content-md-center mb-3">
                        <Col xs={12} md={6} lg={6}>
                        <Button variant="primary" type="submit" className="centerbutton"> Submit </Button>
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

export default CityForm;