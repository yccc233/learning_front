import React from "react";
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import {Button} from "antd";


function MyRoute(props) {

    console.log(props, "MyRoute")
    return <>
        <div style={{textAlign: "center"}} >
            <BrowserRouter basename={"/route"}>
                <Route exact path={"/"}>
                    <Link to={"/baidu"}>百度</Link>
                    <Button type={"link"} onClick={() => props.history.push('/')} >返回</Button>
                </Route>
                <Route path={"/baidu"} component={GoBaidu} />
                {/*<Route path={"/hello"} component={<div>你好</div>} />*/}
                {/*<Route path={"/"} component={<div>没什么啊也</div>} />*/}
            </BrowserRouter>
        </div>
    </>;
}


const GoBaidu = (props) => {

    console.log(props, "baidu")

    return <div>
       <Button onClick={() => {
            // props.location.pathname = "https://www.baidu.com/s?ie=UTF-8&wd=%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1"
           window.location.href = "https://www.baidu.com/s?ie=UTF-8&wd=%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1";
       }}>跳转到百度</Button>
    </div>
}

export default withRouter(MyRoute);
