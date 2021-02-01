import React, {Component} from "react";
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import './CompoundInterest.css';
import CompoundInterestData from './CompoundInterestData/CompoundInterestData';

class CompoundInterest extends Component {

    state = {
        initialInvestment: "",
        monthlyContribution: "",
        interestRatePercent: "",
        interestRate: "",
        interestRate2: "",
        timeInYears: "",
        years2: "",
        compounded: 1,
        moneyPutIn: 0,
        totalProfit: 0,
        loaded: false
    }

    updateInitialInvestment = (event) => {
        if(event.target.value < 0){
            return;
        }
        this.setState({initialInvestment: event.target.value});
    }

    updateMonthlyContribution = (event) => {
        if(event.target.value < 0){
            return;
        }
        this.setState({monthlyContribution: event.target.value});
    }

    updateInterestRate = (event) => {
        if(event.target.value < 0){
            return;
        }
        this.setState({interestRatePercent: event.target.value});
        this.setState({interestRate: event.target.value / 100});
    }

    updateYears = (event) => {
        if(event.target.value < 0){
            return;
        }
        this.setState({timeInYears: event.target.value});
    }

    updateCompoundFrequency = (event) => {
        if(event.target.value === "Annually"){
            this.setState({compounded: 1});
        }
        if(event.target.value === "Semiannually"){
            this.setState({compounded: 2});
        }
        if(event.target.value === "Monthly"){
            this.setState({compounded: 12});
        }
    }

    formSubmit = (event) => {
        event.preventDefault();
        this.calculateProfit();
    }

    calculateProfit = () => {
        let P = this.state.initialInvestment;
        let PMT = this.state.monthlyContribution;
        let r = this.state.interestRate;
        let n = this.state.compounded;
        let t = this.state.timeInYears;

        if(PMT === ""){
            PMT = 0;
        }

        if(P === "" || r === "" || n === "" || t === ""){
            return;
        }

        this.setState({moneyPutIn: PMT * 12 * t})

        if(this.state.compounded === 1){
            PMT *= 12;
        }
        else if(this.state.compounded === 2){
            PMT *= 6;
        }

        let A = P * Math.pow((1 + (r/n)), n * t);

        let contGains = Math.pow((1 + (r/n)), n * t) - 1;
        contGains *= PMT;
        contGains /= (r/n);

        this.setState({years2: this.state.timeInYears});
        this.setState({interestRate2: this.state.interestRatePercent});
        this.setState({totalProfit: A + contGains});
        this.setState({loaded: true});
    }

    resetForm = () => {
        this.setState({
            initialInvestment: "",
            monthlyContribution: "",
            interestRate: "",
            interestRatePercent: "",
            timeInYears: "",
        });
    }

    render() {
        const form = (
            <Form className="totalForm" onSubmit={this.formSubmit}>
                <Form.Group>
                    <h3 className="inputTitle">Initial Investment: </h3>
                    <Form.Control onChange={this.updateInitialInvestment} min="0" className="compoundForm" size="m" type="number" placeholder="enter initial investment" value={this.state.initialInvestment}/>
                    <br />
                    <h3 className="inputTitle">Monthly Contribution: </h3>
                    <Form.Control onChange={this.updateMonthlyContribution} className="compoundForm" size="m" type="number" placeholder="enter monthly contribution" value={this.state.monthlyContribution} />
                    <br />
                    <h3 className="inputTitle">Time in Years: </h3>
                    <Form.Control onChange={this.updateYears} className="compoundForm" size="m" type="number" placeholder="enter time in years" value={this.state.timeInYears}/>
                    <br/>
                    <h3 className="inputTitle">Interest Rate: </h3>
                    <Form.Control onChange={this.updateInterestRate} className="compoundForm" size="m" type="number" placeholder="enter interest rate" value={this.state.interestRatePercent}/>
                    <br/>
                    <h3 className="inputTitle">Compound Frequency: </h3>
                    <Form.Control onChange={this.updateCompoundFrequency} className="compoundForm" as="select">
                        <option>Annually</option>
                        <option>Semiannually</option>
                        <option>Monthly</option>
                    </Form.Control>
                    <Button size="lg" onClick={this.calculateProfit} className="submitButton" variant="primary">Calculate</Button>{' '}
                    <Button size="lg" onClick={this.resetForm} className="submitButton" variant="danger">Reset</Button>{' '}
                </Form.Group>
            </Form>
    );

        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            {form}
                        </Col>
                    </Row>
                </Container>
                <CompoundInterestData
                    allData = {this.state}
                    loaded={this.state.loaded}
                />
            </div>
        );
    }
}

export default CompoundInterest;