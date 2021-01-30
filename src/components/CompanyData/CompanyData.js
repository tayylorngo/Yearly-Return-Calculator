import React, {Component} from "react";
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import './CompanyData.css';

class CompanyData extends Component {

    state = {
        results: []
    }

    componentDidMount() {
        const key = process.env.REACT_APP_SECRET_KEY;
        const url = "https://financialmodelingprep.com/api/v3/profile/" + this.props.ticker + "?apikey=" + key;
        axios.get(url)
            .then(response => {
                this.setState({
                    results: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const stockDescription = this.state.results.map(stock => {
            return <p key={stock.zip} id="stockDescription">{stock.description}</p>
        });
        return (
            <div>
                <h2 id="stockName">{this.props.name}</h2>
                <ListGroup id="stockData">
                    <ListGroup.Item>
                        Company Description
                        <hr/>
                        {stockDescription}
                    </ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default CompanyData;