import React, {Component} from "react";
import './HomePage.css';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class HomePage extends Component{
    render() {
        return (
            <div>
                <div id="landing-header">
                    <div>
                        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                            <Nav className="m-auto">
                                {/*<Link to="/home" className="navLink2">Home Page</Link>*/}
                                <Link to="/stocks" className="navLink2">Stock Calculator </Link>
                                <Link to="/stocks" className="navLink2">Cryptocurrency Calculator</Link>
                                <Link to="/stocks" className="navLink2">Compound Interest Calculator</Link>
                                <a href="https://github.com/tayylorngo/Stock-Yearly-Return-Calculator" className="navLink2">Source Code</a>
                            </Nav>
                        </Navbar>
                        <h1 className="header1">{this.props.name}</h1>
                    </div>
                </div>

                <ul className="slideshow">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
}

export default HomePage;