import React, {Component} from "react";
import axios from "axios";
import {Container, Row, Col, Figure, Table} from "react-bootstrap";
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
        const stockImage = this.state.results.map(stock => {
            return stock.image;
        });
        const stockWebsite = this.state.results.map(stock => {
            return stock.website;
        });
        const stockCEO = this.state.results.map(stock => {
            if(stock.ceo === "None"){
                return "";
            }
            return stock.ceo;
        });
        const location = this.state.results.map(stock => {
            if(stock.city == null || stock.state == null || stock.country == null){
                return "";
            }
            return stock.city + ", " + stock.state + ", " + stock.country;
        });
        const employees = this.state.results.map(stock => {
            return stock.fullTimeEmployees;
        });
        const sector = this.state.results.map(stock => {
            return stock.sector;
        });
        return (
            <div>
                <hr/>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="aboutTitle">About {this.props.name}</h2>
                        </Col>
                        <Col>
                            <Figure id="companyImage">
                                <a href={stockWebsite}>
                                    <Figure.Image
                                        width={171}
                                        height={180}
                                        alt="171x180"
                                        src={stockImage}
                                    />
                                </a>
                            </Figure>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                            <Table striped bordered variant="light" className="dataTable">
                                <thead>
                                <tr>
                                    <th>
                                        CEO
                                    </th>
                                    <th>
                                        Website
                                    </th>
                                    <th>
                                        Location
                                    </th>
                                    <th>
                                        Employees
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {stockCEO}
                                    </td>
                                    <td>
                                        <a href={stockWebsite}>{stockWebsite}</a>
                                    </td>
                                    <td>
                                        {location}
                                    </td>
                                    <td>
                                        {employees}
                                    </td>
                                </tr>
                                </tbody>
                                <thead>
                                <tr>
                                    <th>
                                        Sector
                                    </th>
                                    <th>
                                        Volume
                                    </th>
                                    <th>
                                        Average Volume
                                    </th>
                                    <th>
                                        Price-Earnings Ratio
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        {sector}
                                    </td>
                                    <td>
                                        {this.props.volume}
                                    </td>
                                    <td>
                                        {this.props.averageVol}
                                    </td>
                                    <td>
                                        {Number(this.props.pe).toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>


            </div>
        );
    }
}

export default CompanyData;