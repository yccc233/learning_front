import './App.css';
import CustomWorkSpace from './module/customoffice/workspace';
import LibreofficeWorkSpace from './module/libreoffice/workspace';
import {Routes, Route} from "react-router-dom";
import ErrorBoundary from "./module/errorboundary";
import {Component} from "react";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Routes>
            <Route path={"/"} element={<CustomWorkSpace/>} errorElement={<ErrorBoundary/>}/>
            <Route path={"/customoffice"} element={<CustomWorkSpace/>} errorElement={<ErrorBoundary/>}/>
        </Routes>;
    }
}

export default App;
