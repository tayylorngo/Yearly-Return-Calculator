import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stock from "./components/Stock/Stock";
import {Component} from "react";
import Header from "./components/Header/Header";

class App extends Component {

    render(){
        return (
            <div className="App">
                <Header/>
                <Stock />
            </div>
        );
    }
}

export default App;
