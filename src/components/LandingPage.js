import React from "react";
import { Button, Form, Stack } from "react-bootstrap";
import logout from "../lib/logout";


const LandingPage = () => {
    return (
        <div className="land text-center">
            <h1> I've Been There </h1>
            <div direction="horizontal" className="">
                <a href="/login"> <Button variant="primary">Login</Button> </a>
                <a href="/signUp"> <Button variant="primary">Singup</Button> </a>
            </div>
            <br></br>
            <div className="text-center">
                <a href="/"> <Button variant="primary" onClick={logout}>Logout</Button> </a>
            </div>
            <br></br>
            <div className="text-center">
                <a href="/profile"> <Button variant="primary">Profile</Button> </a>
            </div>
        </div>
    );
};

export default LandingPage;