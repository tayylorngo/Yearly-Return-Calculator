import React, {Component} from "react";
import "./CompoundInterestData.css";
import {Card, Container} from 'react-bootstrap';


class CompoundInterestData extends Component {

    priceify(price){
        let style = {color: "green"};
        let priceString = "";
        if(price < 0){
            style = {color: "red"};
            priceString = "-$" + Math.abs(price).toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        else {
            priceString = "$" + price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
        return <span style={style}>{priceString}</span>;
    }

    priceifyNoColor(price){
        if(price == null || typeof price == "undefined"){
            return "";
        }
        price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        if(price < 0){
            price = "-$" + Math.abs(price).toFixed(2);
        }
        else {
            price = "$" + price;
        }
        return price;
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

    getPercentChange(currentPrice, purchasePrice){
        return (currentPrice - purchasePrice) / purchasePrice * 100;
    }

    render() {
        let years = this.props.allData.years2;

        if(!this.props.loaded){
            return null;
        }
        return(
            <div>
                <br/>
                <Container>
                    <Card className="text-center">
                        <Card.Header className="cardHeader">Results</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <span id="totalProfit">
                                   After {years} years you will have around {this.priceify(this.props.allData.totalProfit.toFixed(2))}
                                </span>
                                <br/>
                                <br/>
                                <div id="otherInformation">
                                    Principal Amount (amount you put in): {this.priceifyNoColor(this.props.allData.moneyPutIn.toFixed(2))}
                                    <br/>
                                    <br/>
                                    Percent Gain: {this.priceifyPercent(this.getPercentChange(this.props.allData.totalProfit, this.props.allData.moneyPutIn).toFixed(2))}
                                    <br/>
                                    <br/>
                                    Money Earned From Interest ({this.props.allData.interestRate2}%): {this.priceify((this.props.allData.totalProfit - this.props.allData.moneyPutIn).toFixed(2))}
                                </div>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }


}

export default CompoundInterestData;