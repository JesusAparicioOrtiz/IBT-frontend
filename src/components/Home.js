import React from "react";
import { Button } from "react-bootstrap";


const Home = () => {
    return (
        <div className="land text-center">
            <h1> I've Been There </h1>
            <div direction="horizontal" className="">
                <a href="/login"> <Button variant="primary">Login</Button> </a>
                <a href="/signUp"> <Button variant="primary">Singup</Button> </a>
            </div>
        </div>
    );
};

export default Home;