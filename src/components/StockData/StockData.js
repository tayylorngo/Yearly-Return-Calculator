import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import './StockData.css';

class StockData extends Component {

    getYearlyAverage(){
        return (this.props.yearLow + this.props.yearHigh) / 2;
    }

    getProfit(purchasePrice, currentPrice){
        return currentPrice - purchasePrice;
    }

    render() {
        return(
            <div>
                <div className="stockNameAndPrice">
                    <h1>{this.props.name}</h1>
                    <h1>{this.props.ticker}</h1>
                    <h2>Current Price: ${this.props.currentPrice}</h2>
                </div>
                <Container className="yearlyDataContainer">
                    <Row>
                        <Col>
                            <span className="yearlyData">Year Low: ${this.props.yearLow}</span>
                        </Col>
                        <Col>
                            <span className="yearlyData">Year Average: ${this.getYearlyAverage().toFixed(2)}</span>
                        </Col>
                        <Col>
                            <span className="yearlyData">Year High: ${this.props.yearHigh}</span>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>${this.props.yearLow} per share</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly Low</Card.Subtitle>
                                    <Card.Text>
                                        Total Profit:
                                        ${this.getProfit(this.props.yearLow, this.props.currentPrice).toFixed(2)}
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
                                        ${this.getProfit(this.getYearlyAverage().toFixed(2), this.props.currentPrice).toFixed(2)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>${this.props.yearHigh} per share</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly High</Card.Subtitle>
                                    <Card.Text>
                                        Total Profit:
                                        ${this.getProfit(this.props.yearHigh, this.props.currentPrice).toFixed(2)}
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

export default StockData;