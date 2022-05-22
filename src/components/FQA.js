import { useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import React, {useState, useEffect } from "react";
import axios from 'axios';

const FQA = () => {
    let { id } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect( () => { 
        const getCityQuestions = ( async () => {
            axios.get('http://localhost:5000/api/v1/city/'+id, {
            headers: {
                'x-access-token': localStorage.getItem('user')
            }
            }).then(res => {
                setQuestions(res.data.questions);
            })
        }) 
        getCityQuestions();
    }, []); 

    return (
        <div className="wrapper">
            <h1>FQA</h1>
            <Container>

                <Row className="justify-content-md-center">
                    <Col xs={12} md={6} lg={6}>
                        <Form.Group controlId="question" className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" placeholder="Enter question" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs={12} md={6} lg={6}>
                        <Form.Group controlId="answer" className="mb-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control type="text" placeholder="Enter answer" />
                        </Form.Group>
                    </Col>
                </Row>

            </Container>
        </div>
    );

}

export default FQA;