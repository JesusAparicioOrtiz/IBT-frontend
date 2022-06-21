import React from "react";
import { Button, Container, Row } from "react-bootstrap";


const Home = () => {
    return (
        <Container className="home-wrapper">
            <div className="row justify-content-center">
                <img src="logo.png" alt="logo" className="invert" style={{ width: "250px" }} />
            </div>
            <div className="row justify-content-around mt-4">
                <div class="col-6">
                    <a href="/login"> <Button variant="primary" className="btn-lg">Login</Button> </a>
                </div>
                <div class="col-6">
                    <a href="/signUp"> <Button variant="primary" className="btn-lg">Singup</Button> </a>
                </div>
            </div>
        </Container>

    );
};

export default Home;