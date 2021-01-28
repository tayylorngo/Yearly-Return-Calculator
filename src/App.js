import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stock from "./components/Stock/Stock";
import {Component} from "react";

class App extends Component {

    render(){
        return (
            <div className="App">
                <Stock
                ticker="AAPL"
                />
            </div>
        );
    }
}

export default App;
