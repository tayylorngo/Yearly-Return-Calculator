import React, {Component} from 'react';
import axios from "axios";
import './Stock.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Stock extends Component {

    state = {
        name: "",
        ticker: "",
        currentPrice: "",
        yearHigh: "",
        yearLow: "",
        stockLoaded: false
    }

    componentDidMount() {
        const key = process.env.REACT_APP_SECRET_KEY;
        const url = "https://financialmodelingprep.com/api/v3/quote/" +  this.props.ticker + "?apikey=" + key;
        axios.get(url)
            .then(response => {
                this.setState({
                    name: response.data[0].name,
                    ticker: response.data[0].symbol,
                    currentPrice: response.data[0].price,
                    yearHigh: response.data[0].yearHigh,
                    yearLow: response.data[0].yearLow,
                    stockLoaded: false
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    getYearlyAverage(){
        return (this.state.yearLow + this.state.yearHigh) / 2;
    }

    getProfit(purchasePrice, currentPrice){
        return currentPrice - purchasePrice;
    }

    render() {
            return (
                <div className="totalDiv">
                    <div className="stockNameAndPrice">
                        <h1>{this.state.name}</h1>
                        <h1>{this.state.ticker}</h1>
                        <h2>Current Price: ${this.state.currentPrice}</h2>
                    </div>
                    <Container className="yearlyDataContainer">
                        <Row>
                            <Col>
                                <span className="yearlyData">Year Low: ${this.state.yearLow}</span>
                            </Col>
                            <Col>
                                <span className="yearlyData">Year Average: ${this.getYearlyAverage().toFixed(2)}</span>
                            </Col>
                            <Col>
                                <span className="yearlyData">Year High: ${this.state.yearHigh}</span>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <Row>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>${this.state.yearLow} per share</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly Low</Card.Subtitle>
                                        <Card.Text>
                                            Total Profit:
                                            ${this.getProfit(this.state.yearLow, this.state.currentPrice).toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>${this.getYearlyAverage().toFixed(2)} per share</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly Average</Card.Subtitle>
                                        <Card.Text>
                                            Total Profit:
                                            ${this.getProfit(this.getYearlyAverage().toFixed(2), this.state.currentPrice).toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>${this.state.yearHigh} per share</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly High</Card.Subtitle>
                                        <Card.Text>
                                            Total Profit:
                                            ${this.getProfit(this.state.yearHigh, this.state.currentPrice).toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
   }
}

export default Stock;