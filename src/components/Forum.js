import React, {useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Button, Form, Spinner, Row, Col, Container, Card } from "react-bootstrap";
import axios from 'axios';
import NavigationBar from './Navigationbar';


const Forum = () => {
    let { id } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect( () => { 
        axios.get(`${process.env.REACT_APP_SERVER}/api/v1/forum/question/` + id).then(res => {
            setQuestions(res.data);
        }).catch(err => {
            alert(err);
        });
    }, []);

    const handleAddQuestion = (e) => {
        e.preventDefault();
        window.location.href = `/forum/addquestion/${id}`;
    }

    const handleAnswer = (e) => {
        // e.preventDefault();
        // window.location.href = `/forum/addanswer/${id}`;
    }
        

    return (
        <>
        <NavigationBar />
        <div className="wrapper">
            <h1 className="mb-4">{id}</h1>
            <Button className="mb-4" variant="primary" type="submit" onClick={handleAddQuestion}>Make question</Button>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={10} lg={10}>
                    <Card>
                        <Card.Header as="h3">Questions</Card.Header>
                        {questions.map((question) => {
                            return (
                                <Card>
                                <Card.Body>
                                    <Card.Title className="mb-4">{question.question}</Card.Title>
                                    <Card.Text>Asked by: </Card.Text>
                                    <Button variant="primary" onClick={handleAnswer}>Answer</Button>
                                </Card.Body>
                                </Card>
                            )
                        }
                        )}
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
}

export default Forum;