import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavigationBar from './Navigationbar';
import addQuestion from "../lib/addQuestion";


const QuestionForm = () => {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const question = e.target.question.value;
        addQuestion(question, id).then((res) => {
            setLoading(false);
            window.location.href = '/forum/' + id;
        }).catch((error) => {
            alert(error);
            setLoading(false);
        });
    }
    
    return (<>
        <NavigationBar />
        <div className="wrapper">
            <h1>Make a question of {id}</h1>
            <Container>
                <Form onSubmit = {handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                            <Form.Group controlId="question" className="mb-3 mt-3">
                                <Form.Control type="text" placeholder="Enter question" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6} lg={6}>
                        <Button variant="primary" type="submit" className="centerbutton mb-3"> Submit </Button>
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

export default QuestionForm;