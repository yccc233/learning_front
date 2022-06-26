import React, {Fragment, useEffect} from "react";
import "./index.css";
import init from "./rg";
import init1 from "./rg1";
import init2 from "./rg2";
import init3 from "./rg3";


function RelationsGraph() {
    useEffect(() => {
        init();
        init1();
        init2();
        init3();
    }, [])

    return (<Fragment>
        <div style={{width: "100%"}}>
            <div id={"rg-custom"} className={"div-item"} style={{border: "1px solid red"}} />
        </div>
        <div style={{width: "100%"}}>
            <div id={"rg3"} className={"div-item"} />
        </div>
        <div style={{width: "100%"}}>
            <div id={"rg2"} className={"div-item"} />
        </div>
        <div style={{width: "100%"}}>
            <div id={"rg1"} className={"div-item"} />
        </div>
    </Fragment>);
}

export default RelationsGraph;