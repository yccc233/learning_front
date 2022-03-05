import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Cookie from "react-cookies";
import Login from "./login/Login";
import Register from "./login/Register";
import Homepage from "./home/Homepage";
import Notify from "./notify";
import '../css/App.css';

function App() {

    return (
        <>
            <BrowserRouter basename={"/"}>
               <Switch>
                   <Route exact path={"/"} component={() => (<Redirect to={"/login"} />)} />
                   <Route path={"/login"} component={Login} />
                   <Route path={"/register"} component={Register} />
                   <Route path={"/homepage"} render={() => {
                       const userid = Cookie.load("userid");
                       if (!userid) Notify("error", "登陆时间过期啦，重新登陆！");
                       return userid ? <Homepage /> :
                           <Redirect to={'/login'} />;
                   }} />
                   {/*这种方法有一个好处是可以承载更多的根路由进来，因为有switch组件阻挡，所以只要不是login或register路由，都会经过这一层，并且还能判断是否登陆过期！*/}
                   {/*<Route path={"/"} render={() => {*/}
                   {/*    const userid = Cookie.load("userid");*/}
                   {/*    if (!userid) {*/}
                   {/*        Notify("error", "登陆时间过期啦，重新登陆！");*/}
                   {/*        return <Redirect to={'/login'}/>;*/}
                   {/*    }*/}
                   {/*    return (*/}
                   {/*        <Route path={"/homepage"} component={Homepage}/>*/}
                   {/*    )*/}
                   {/*}} />*/}
               </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
