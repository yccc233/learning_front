import React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Usecallback from "./usecallback";
import Usecontext from "./usecontext";
import Usereducer from "./usereducer";
import Usedispatch from "./usedispatch";

function FuncComs() {
    return <BrowserRouter  basename={"/reactfunc"}>
        <Route path={'/'} exact component={Home} />
        <Route path={"/useCallback"} component={Usecallback} />
        <Route path={"/useContext"} component={Usecontext} />
        <Route path={"/useReducer"} component={Usereducer} />
        <Route path={"/useDispatch"} component={Usedispatch} />
    </BrowserRouter>
}


const Home = () => (
    <div style={{textAlign: "center", margin: "50px 0"}}>
        <h2>useCallback</h2>
        <Link to={"/useCallback"}>Go</Link>
        <Block />
        <h2>useContext</h2>
        <Link to={"/useContext"}>Go</Link>
        <Block />
        <h2>useReducer</h2>
        <Link to={"/useReducer"}>Go</Link>
        <Block />
        <h2>useDispatch</h2>
        <Link to={"/useDispatch"}>Go</Link>
        <Block />
    </div>
)

const Block = () => <div style={{width: "100%", height: "50px"}}/>


export default FuncComs;
