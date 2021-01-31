import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                        <Nav className="m-auto">
                            <Link to="/home" className="navLink">Home Page</Link>
                            <Link to="/stocks" className="navLink">Stock Calculator </Link>
                            <Link to="/stocks" className="navLink">CryptoCurrency Calculator</Link>
                            <Link to="/stocks" className="navLink">Compound Interest Calculator</Link>
                        </Nav>
                </Navbar>
                <hr/>
                <h1 className="header1">{this.props.name}</h1>
            </div>
        );
    }
}

export default Header;