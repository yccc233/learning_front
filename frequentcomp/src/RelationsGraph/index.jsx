import React, {Fragment, useEffect} from "react";
import "./index.css";
import "./common.css";
// import init from "./rg";
// import init1 from "./rg1";
// import init2 from "./rg2";
// import init3 from "./rg3";
// import init4 from "./rg4";
// import init5 from "./rg5";
import init6 from "./rg6";

function RelationsGraph() {
    useEffect(() => {
        // init();
        // init1();
        // init2();
        // init3();
        // init4();
        // init5();
        init6();
    }, [])

    return (<Fragment>
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg-custom"} className={"div-item"} style={{border: "1px solid red"}} />*/}
        {/*</div>*/}
        <div style={{width: "100%"}}>
            <div className={"div-item"} >
                <div id={"rocchartrg6"} style={{width: "100%", height: "100%"}}>
                    <p > 暂无数据 </p>
                </div>
            </div>
        </div>
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg5"} className={"div-item"} />*/}
        {/*</div>*/}
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg4"} className={"div-item"} />*/}
        {/*</div>*/}
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg3"} className={"div-item"} />*/}
        {/*</div>*/}
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg2"} className={"div-item"} />*/}
        {/*</div>*/}
        {/*<div style={{width: "100%"}}>*/}
        {/*    <div id={"rg1"} className={"div-item"} />*/}
        {/*</div>*/}
    </Fragment>);
}

export default RelationsGraph;