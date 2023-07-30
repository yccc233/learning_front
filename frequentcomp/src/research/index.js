import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Relations from "./relations";


export default function Index() {

    return <BrowserRouter basename={"/research"}>
        <Switch>
            <Route path={"/relations"} render={Relations}/>
            <Route exact path={"/"} render={SelectPath}/>
        </Switch>
    </BrowserRouter>;
}


const SelectPath = () => (
    <div style={{width: "100%", height: "100%", textAlign: "center"}}>
        <h2>关系-g6</h2>
        <Link to={"/relations"}>Go</Link>
        <Block/>
    </div>
)
const Block = () => <div style={{width: "100%", height: "50px"}}/>