import React, {Component} from 'react';
import axios from "axios";
import './Stock.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Form} from "react-bootstrap";
import StockData from "./StockData/StockData";

class Stock extends Component {
    state = {
        ticker: "",
        results: [],
    }

    loadStock() {
        const key = process.env.REACT_APP_SECRET_KEY;
        const url = "https://financialmodelingprep.com/api/v3/quote/" +  this.state.ticker + "?apikey=" + key;
        axios.get(url)
            .then(response => {
                this.setState({
                    results: response.data
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    changeStock = (event) => {
        this.setState({ticker: event.target.value.toUpperCase()});
    }

    updateStock = (event) => {
        event.preventDefault();
        this.loadStock();
    }

    render() {
        const form = (
                    <Form onSubmit={this.updateStock}>
                        <Form.Control
                            placeholder="enter stock ticker/symbol"
                            type="text"
                            size="lg"
                            onChange={this.changeStock}
                        />
                    </Form>
        );

        const stock = this.state.results.map(stock => {
           return (
               <div>
                   <StockData
                       name={stock.name}
                       ticker={stock.symbol}
                       currentPrice={stock.price}
                       yearLow={stock.yearLow}
                       yearHigh={stock.yearHigh}
                       key={stock.symbol}
                       volume={stock.volume}
                       averageVol={stock.avgVolume}
                       pe={stock.pe}
                   />
               </div>)
        });

        return (
                <div>
                    <Container>
                        <Row>
                            <Col>
                                {form}
                            </Col>
                        </Row>
                    </Container>
                    {stock}
                </div>
        );
   }
}

export default Stock;