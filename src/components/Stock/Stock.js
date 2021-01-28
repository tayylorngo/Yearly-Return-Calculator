import React, {Component} from 'react';
import axios from "axios";
import './Stock.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from "react-bootstrap";
import StockData from "../StockData/StockData";

class Stock extends Component {

    state = {
        ticker: "AAPL",
        results: []
    }

    componentDidMount() {
        const key = process.env.REACT_APP_SECRET_KEY;
        const url = "https://financialmodelingprep.com/api/v3/quote/" +  this.state.ticker + "?apikey=" + key;
        axios.get(url)
            .then(response => {
                const stock = response.data;
                this.setState({
                    results: stock
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    changeStock = (event) => {
        this.setState({ticker: event.target.value});
    }

    updateStock = (event) => {
        event.preventDefault();
        this.componentDidMount();
    }

    render() {
        const form = (
            <Form onSubmit={this.updateStock}>
                <Form.Control
                    placeholder="enter ticker/symbol"
                    type="text"
                    onChange={this.changeStock}
                />
            </Form>
        );

        const stock = this.state.results.map(stock => {
           return <StockData
               name={stock.name}
               ticker={stock.symbol}
               currentPrice={stock.price}
               yearLow={stock.yearLow}
               yearHigh={stock.yearHigh}
               key={stock.symbol}
           />
        });

        return (
            <div className="totalDiv">
               {form}
               {stock}
            </div>
        );
   }
}

export default Stock;