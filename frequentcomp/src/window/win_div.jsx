import "./win_div.css";

import React from "react";

function WinDiv() {
    return <>
        <div className={"box-1"}>
            <div className={"box-2-l"}>
                <div className={"box-2-l-1"}>板块一</div>
                <div className={"box-2-l-1"}>版块二</div>
                <div className={"box-2-l-1"}>板块三</div>
            </div>
            <div className={"box-2-r"}>
                <div className={"box-2-r-1"}>板块四</div>
                <div className={"box-2-r-1"}>板块五</div>
            </div>
        </div>
    </>;
}


export default WinDiv;
