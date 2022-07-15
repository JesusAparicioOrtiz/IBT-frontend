import React, {useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import NavigationBar from './Navigationbar';
import Select from 'react-select'
import axios from 'axios';


const CityForm = () => {
    
    const [cities, setCities] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedValue.length === 0) {
            alert('Please select a place');
            return;
        }

        if(cities.indexOf(selectedValue) === -1) {
            alert('This place is not available');
            return;
        }

        window.location.href = `/forum/${selectedValue.value}`;
    }


    useEffect( async () => { 
        axios.get(`${process.env.REACT_APP_SERVER}/api/v1/city/all`).then(res => {
            setCities( res.data.map(city => { return { value: city, label: city } }));
        })
    }, []);


    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Search for a place</h1>
            <Container className="mt-4">
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={9} md={5} lg={5}>
                            <Select
                                    value={selectedValue}
                                    onChange={setSelectedValue}
                                    options={cities}
                                    placeholder={'Select place...'}
                                    className="mb-3"
                                />
                        </Col>
                        <Col xs={1} md={1} lg={1}>
                            <Button variant="primary" type="button" className="centerbutton" onClick={handleSubmit}> Search </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
        </>
    );
};

export default CityForm;