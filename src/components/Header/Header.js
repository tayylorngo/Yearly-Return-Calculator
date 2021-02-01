import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FaBitcoin} from 'react-icons/fa';
import './Header.css';

class Header extends Component {
    render() {
        let icon;
        if(this.props.name === "Cryptocurrency Return Calculator"){
            icon = <FaBitcoin/>
        }
        return (
            <div className="totalDiv">
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                        <Nav className="m-auto">
                            <Link to="/home" className="navLink">Home Page</Link>
                            <Link to="/stocks" className="navLink">Stock Calculator </Link>
                            <Link to="/crypto" className="navLink">CryptoCurrency Calculator</Link>
                            <Link to="/compoundinterest" className="navLink">Compound Interest Calculator</Link>
                            <a href="https://github.com/tayylorngo/Stock-Yearly-Return-Calculator" className="navLink">Source Code</a>
                        </Nav>
                </Navbar>
                <hr/>
                <h1 className="header1">{this.props.name}</h1>
            </div>
        );
    }
}

export default Header;