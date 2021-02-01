import React, {Component} from "react";
import './HomePage.css';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class HomePage extends Component{
    render() {
        return (
            <div className="homepageFill">
                <div id="landing-header">
                    <div>
                        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                            <Nav className="m-auto">
                                <Link to="/stocks" className="navLink2">Stock Calculator </Link>
                                <Link to="/crypto" className="navLink2">Cryptocurrency Calculator</Link>
                                <Link to="/compoundinterest" className="navLink2">Compound Interest Calculator</Link>
                                <a href="https://github.com/tayylorngo/Stock-Yearly-Return-Calculator" className="navLink2">Source Code</a>
                            </Nav>
                        </Navbar>
                        <h1 className="header1">{this.props.name}</h1>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <h2><a id="createdBy" href="https://www.taylorngo.com/">Created by Taylor Ngo</a></h2>
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