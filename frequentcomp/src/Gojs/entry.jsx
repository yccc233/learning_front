import React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Go1 from "./go1";
import Go2 from "./go2";
import Go3 from "./go3";
import Go4 from "./go4";

function Gojs() {
    return <BrowserRouter  basename={"/gojs"}>
        <Route path={'/'} exact component={Home} />
        <Route path={"/go1"} component={Go1} />
        <Route path={"/go2"} component={Go2} />
        <Route path={"/go3"} component={Go3} />
        <Route path={"/go4"} component={Go4} />
    </BrowserRouter>
}


const Home = () => (
    <div style={{textAlign: "center", margin: "50px 0"}}>
        <h2>公司对人（仅查看）</h2>
        <Link to={"/go1"}>Go</Link>
        <Block />
        <h2>公司对人（编辑）</h2>
        <Link to={"/go2"}>Go</Link>
        <Block />
        <h2>公司对多方关系（仅看）</h2>
        <Link to={"/go3"}>Go</Link>
        <Block />
        <h2>关系图谱拓展</h2>
        <Link to={"/go4"}>Go</Link>
        <Block />
    </div>
)

const Block = () => <div style={{width: "100%", height: "50px"}}/>


export default Gojs;
