import './App.css';

import {withRouter, Route, Switch, Link, Redirect, BrowserRouter} from "react-router-dom";
// import {IndexRoute} from "react-router";
import MyRoute from "./Route/MyRoute";
import MyTable from "./Table/MyTable";
import MyForm from "./Form/MyForm";
import MyDrag from "./Drag/MyDrag";
import Html2canvas from "./Html2canvas/Html2canvas";
import ContextX from "./ContextMenu/Context";
import MyModal from "./Modal/Modal";
import DynaWin from "./Dynawin/DynaWin";
import "antd/dist/antd.css";


function App(props) {

    return (
        <div style={{width: "100%"}}>
            {/*这里Switch 和 exact 用一个就够了*/}
            <BrowserRouter basename={"/"}>
                <Switch>
                    <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
                    <Route path={"/dynawin"} component={DynaWin} />
                    {/*<Route path={"/route"} component={MyRoute} />*/}
                    <Route path={"/route"}>
                        <MyRoute />
                    </Route>
                    <Route path={"/table"} component={MyTable} />
                    <Route path={"/form"} component={MyForm} />
                    <Route path={"/drag"} component={MyDrag} />
                    <Route path={"/home"} component={Home} />
                    <Route path={"/html2canvas"} component={Html2canvas} />
                    <Route path={"/contextmenu"} component={ContextX} />
                    <Route path={"/modal"} component={MyModal} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

const Home = () => {
    return <div style={{textAlign: "center", margin: "50px 0"}}>
            <h2>路由</h2>
            <Link to={"/route"}>Go</Link>
            <Block />
            <h2>动态页面</h2>
            <Link to={"/dynawin"}>Go</Link>
            <Block />
            <h2>表格数据</h2>
            <Link to={"/table"}>Go</Link>
            <Block />
            <h2>表单</h2>
            <Link to={"/form"}>Go</Link>
            <Block />
            <h2>拖放</h2>
            <Link to={"/drag"}>Go</Link>
            <Block />
            <h2>截屏快照</h2>
            <Link to={"/html2canvas"}>Go</Link>
            <Block />
            <h2>右键菜单</h2>
            <Link to={"/contextmenu"}>Go</Link>
            <Block />
            <h2>弹窗</h2>
            <Link to={"/modal"}>Go</Link>
        </div>
}

const Block = () => <div style={{width: "100%", height: "50px"}}/>

export default withRouter(App);
