import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import CompanyData from "../CompanyData/CompanyData";
import {Col, Row, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import './StockData.css';

class StockData extends Component {

    state = {
        shares: 1
    }

    getYearlyAverage(){
        return (this.props.yearLow + this.props.yearHigh) / 2;
    }

    getProfit(purchasePrice, currentPrice){
        return (currentPrice - purchasePrice) * this.state.shares;
    }

    getPercentChange(purchasePrice, currentPrice){
        if(this.state.shares === 0){
            return 0;
        }
        else {
            return ((this.getTotalCost(currentPrice) - this.getTotalCost(purchasePrice)) / this.getTotalCost(purchasePrice)) * 100;
        }
    }

    getTotalCost(purchasePrice){
        return (this.state.shares * purchasePrice).toFixed(2);
    }

    priceifyNoColor(price){
        price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        if(price < 0){
            price = "-$" + Math.abs(price).toFixed(2);
        }
        else {
            price = "$" + price;
        }
        return price;
    }

    priceify(price){
        let style = {color: "green"};
        price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        if(price < 0){
            style = {color: "red"};
            price = "-$" + Math.abs(price).toFixed(2);
        }
        else {
            price = "$" + price;
        }
        return <span style={style}>{price}</span>;
    }

    priceifyPercent(price){
        let style = {color: "green"};
        price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        if(price < 0){
            style = {color: "red"};
            price = Math.abs(price).toFixed(2);
        }
        return <span style={style}>{price}%</span>;
    }

    updateNumberOfShares = (event) => {
        event.preventDefault();
    }

    changeNumberOfShares = (event) => {
        if(event.target.value < 0 || event.target.value === ""){
            this.setState({shares: 0});
            return;
        }
        else if(event.target.value > 9999999){
            return;
        }
        this.setState({shares: event.target.value});
    }

    render() {
        const loss = " loss";
        const gain = " gain";
        const line = <hr/>;

        if(this.props.name === ""){
            return null;
        }
        else{
            return(
                <div>
                    <div className="stockNameAndPrice">
                        <h1>{this.props.name} ({this.props.ticker})</h1>
                        <h2 id="currentPrice">Current Price: {this.priceifyNoColor(this.props.currentPrice)}</h2>
                    </div>
                    <Container className="yearlyDataContainer">
                        <Row>
                            <Col>
                                <span className="yearlyData">Year Low: {this.priceifyNoColor(this.props.yearLow.toFixed(2))}</span>
                            </Col>
                            <Col>
                                <span className="yearlyData">Year Average: {this.priceifyNoColor(this.getYearlyAverage().toFixed(2))}</span>
                            </Col>
                            <Col>
                                <span className="yearlyData">Year High: {this.priceifyNoColor(this.props.yearHigh.toFixed(2))}</span>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <h2 id="numOfShares">Number of Shares: {this.state.shares}</h2>
                                <Form
                                    className="numberOfSharesForm"
                                    onSubmit={this.updateNumberOfShares}>
                                    <Form.Control
                                        value={this.state.shares === 0 ? "" : this.state.shares}
                                        placeholder=""
                                        type="number"
                                        size="lg"
                                        onChange={this.changeNumberOfShares}
                                        className=""
                                        min="0"
                                        max="9999999"
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <Row>
                            <Col className="profitCard" >
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className="totalProfit">
                                            <span className="totalProfitTitle">Total Profit:</span>
                                            <br/>
                                            <span className="totalProfit">{this.priceify(this.getProfit(this.props.yearLow, this.props.currentPrice).toFixed(2))}</span>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly Low</Card.Subtitle>
                                        <Card.Text>
                                            {this.priceifyNoColor(this.props.yearLow.toFixed(2))} per share
                                            <br/>
                                            Total Cost: {this.priceifyNoColor(this.getTotalCost(this.props.yearLow))}
                                            <br/>
                                            Current Value: {this.priceifyNoColor((this.props.currentPrice * this.state.shares).toFixed(2))}
                                            <br/>
                                            <span>
                                                {this.priceifyPercent(this.getPercentChange(this.props.yearLow, this.props.currentPrice).toFixed(2))}
                                                {this.getPercentChange(this.props.yearLow, this.props.currentPrice).toFixed(2) < 0 ? loss : gain}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="profitCard">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title className="totalProfit">
                                            <span className="totalProfitTitle">Total Profit:</span>
                                            <br/>
                                            <span className="totalProfit">{this.priceify(this.getProfit(this.getYearlyAverage(), this.props.currentPrice).toFixed(2))}</span>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly Average</Card.Subtitle>
                                        <Card.Text>
                                            {this.priceifyNoColor(this.getYearlyAverage().toFixed(2))} per share
                                            <br/>
                                            Total Cost: {this.priceifyNoColor(this.getTotalCost(this.getYearlyAverage().toFixed(2)))}
                                            <br/>
                                            Current Value: {this.priceifyNoColor((this.props.currentPrice * this.state.shares).toFixed(2))}
                                            <br/>
                                            <span>
                                                {this.priceifyPercent(this.getPercentChange(this.getYearlyAverage().toFixed(2), this.props.currentPrice).toFixed(2))}
                                                {this.getPercentChange(this.getYearlyAverage().toFixed(2), this.props.currentPrice).toFixed(2) < 0 ? loss : gain}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="profitCard">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            <span className="totalProfitTitle">Total Profit:</span>
                                            <br/>
                                            <span className="totalProfit">{this.priceify(this.getProfit(this.props.yearHigh, this.props.currentPrice).toFixed(2))}</span>
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">If Purchased At Yearly High</Card.Subtitle>
                                        <Card.Text>
                                            {this.priceifyNoColor(this.props.yearHigh)} per share
                                            <br/>
                                            Total Cost: {this.priceifyNoColor(this.getTotalCost(this.props.yearHigh))}
                                            <br/>
                                            Current Value: {this.priceifyNoColor((this.props.currentPrice * this.state.shares).toFixed(2))}
                                            <br/>
                                            <span>
                                                {this.priceifyPercent(this.getPercentChange(this.props.yearHigh, this.props.currentPrice).toFixed(2))}
                                                {this.getPercentChange(this.props.yearHigh, this.props.currentPrice).toFixed(2) < 0 ? loss : gain}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    {line}
                    <CompanyData
                        ticker={this.props.ticker}
                    />
                </div>
            );
        }
    }
}

export default StockData;