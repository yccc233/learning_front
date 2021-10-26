import './App.css';

import {withRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import "antd/dist/antd.css";
import MyTable from "./Table/MyTable";
import MyForm from "./Form/MyForm";
import MyDrag from "./Drag/MyDrag";

function App() {
    return (
        <div style={{width: "100%"}}>
            <Switch>
                <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
                <Route path={"/table"} component={MyTable} />
                <Route path={"/form"} component={MyForm} />
                <Route path={"/drag"} component={MyDrag} />
                <Route path={"/home"} component={Home} />
            </Switch>
        </div>
    );
}

const Home = () => {
    return <div style={{textAlign: "center", margin: "50px 0"}}>
            <h2>表格数据</h2>
            <Link to={"/table"}>Go</Link>
            <Block />
            <h2>表单</h2>
            <Link to={"/form"}>Go</Link>
            <Block />
            <h2>拖放</h2>
            <Link to={"/drag"}>Go</Link>
        </div>
}

const Block = () => <div style={{width: "100%", height: "50px"}}/>

export default withRouter(App);
