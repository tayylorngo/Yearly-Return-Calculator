import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stock from "./components/Stock/Stock";
import {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";

class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/" exact absolute render={() =>
                        <div>
                            <Header name=""/>
                        </div>
                    }/>
                    <Route path="/home" exact absolute render={() =>
                        <div>
                            <Header name=""/>
                        </div>
                    }/>
                    <Route path="/stocks" exact absolute render={() =>
                        <div>
                            <Header name="Stock Return Calculator"/>
                            <Stock />
                        </div>
                    }/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
