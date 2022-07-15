import React, {useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Button, Form, Row, Col, Container, Card, Pagination} from "react-bootstrap";
import axios from 'axios';
import NavigationBar from './Navigationbar';


const Forum = () => {
    let { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [paging, setPaging] = useState(1);
    const [activePage, setActivePage] = useState(1);

    for (let i = 1; i < questions.length; i++) {
        questions[i].page = Math.floor(i / 5) + 1;
    }


    useEffect( () => { 
        axios.get(`${process.env.REACT_APP_SERVER}/api/v1/forum/question/` + id).then(res => {
            setQuestions(res.data);
            setPaging(Math.trunc(res.data.length / 5) + 1);
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

    const handlePageChange = (e) => {
        setActivePage(e.target.value);
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
                        {questions.map(question => {
                            return question.page==activePage ? (
                                <Card>
                                <Card.Body>
                                    <Card.Title className="mb-4">{question.question}</Card.Title>
                                    <Card.Text>Asked by: </Card.Text>
                                    <Button variant="primary" onClick={handleAnswer}>Answer</Button>
                                </Card.Body>
                                </Card>
                            ) : null;
                        }
                        )}
                    </Card>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={10} lg={10}>
                            <Pagination>
                                <Pagination.First onClick={() => setActivePage(1)} />
                                <Pagination.Prev onClick={() => setActivePage((activePage - 1) < 1 ? 1 : (activePage - 1))} />
                                {Array.from({ length: paging }, (_, i) => {
                                    return (
                                        <Pagination.Item onClick={() => setActivePage(i + 1)}>{i + 1}</Pagination.Item>
                                    )
                                })}
                                <Pagination.Next onClick={() => setActivePage((activePage + 1) > paging ? paging: (activePage + 1))} />
                                <Pagination.Last onClick={() => setActivePage(paging)} />
                            </Pagination>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
        </>
    );
}

export default Forum;