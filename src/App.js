import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stock from "./components/Stock/Stock";
import {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Crypto from "./components/Crypto/Crypto";
import CompoundInterest from "./components/CompoundInterest/CompoundInterest";

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/" exact absolute render={() =>
                        <div>
                            <HomePage />
                        </div>
                    }/>
                    <Route path="/home" exact absolute render={() =>
                        <div>
                            <HomePage />
                        </div>
                    }/>
                    <Route path="/stocks" exact absolute render={() => {
                        return (
                            <div className="stockPage">
                            <Header name="Stock Return Calculator"/>
                            <Stock />
                        </div>);
                    }}/>
                    <Route path="/crypto" exact absolute render={() => {
                        return (
                            <div className="cryptoPage">
                                <Header
                                    name="Cryptocurrency Return Calculator"/>
                                <Crypto />
                            </div>);
                    }}/>
                    <Route path="/compoundinterest" exact absolute render={() => {
                        return (
                            <div className="compoundInterestPage">
                                <Header name="Compound Interest Return Calculator"/>
                                <CompoundInterest />
                            </div>
                        );
                    }}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
