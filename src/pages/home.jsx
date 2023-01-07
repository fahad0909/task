import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

const Home = () => {
    return (
        <div className="home">
            <div className="">
                <Link to="/allContacts"><Button className="buttonA mx-2">Button A</Button></Link>
                <Link to="/usContacts"><Button className="buttonB">Button B</Button></Link>
            </div>
        </div>
    );
};

export default Home;