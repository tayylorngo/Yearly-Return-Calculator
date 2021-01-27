import React, {Component} from 'react';
import './Stock.css';
import axios from "axios";

class Stock extends Component {

    state = {
        name: "",
        ticker: "",
        currentPrice: "",
        yearHigh: "",
        yearLow: "",
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
                    yearLow: response.data[0].yearLow
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render() {
       return (
           <div>
               {this.state.name}
               <br/>
               {this.state.ticker}
               <br/>
               Price: {this.state.currentPrice}
               <br/>
               Year High: {this.state.yearHigh}
               <br/>
               Year Low: {this.state.yearLow}
           </div>
       );
   }
}

export default Stock;