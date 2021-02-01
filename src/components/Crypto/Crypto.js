import React, {Component} from "react";
import './Crypto.css';
import {Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import CryptoData from "./CryptoData/CryptoData";

class Crypto extends Component {

    state = {
        symbol: "",
        results: []
    }

    loadCrypto(){
        const key = process.env.REACT_APP_SECRET_KEY2;
        const url = "https://financialmodelingprep.com/api/v3/quote/" +  this.state.symbol + "USD?apikey=" + key;
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

    changeCrypto = (event) => {
        this.setState({symbol: event.target.value.toUpperCase()});
    }

    updateCrypto = (event) => {
        event.preventDefault();
        this.loadCrypto();
    }

    render() {
        const form = (
            <Form onSubmit={this.updateCrypto}>
                <Form.Control
                    placeholder="enter cryptocurrency symbol ex: BTC, ETH"
                    type="text"
                    size="lg"
                    onChange={this.changeCrypto}
                />
            </Form>
        );

        const crypto = this.state.results.map(crypto => {
            return (
                <div>
                    <CryptoData
                        name={crypto.name}
                        symbol={crypto.symbol}
                        currentPrice={crypto.price}
                        yearLow={crypto.yearLow}
                        yearHigh={crypto.yearHigh}
                        key={crypto.symbol}
                        volume={crypto.volume}
                        averageVolume={crypto.avgVolume}
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
                {crypto}
            </div>
        );
    }
}

export default Crypto;