import React from "react";
import Box from "./box";
import FileBox from "./filebox";

function WindowCom() {
    return <>
        <div style={{margin: 10}}>
            <Box />
        </div>
        <div style={{margin: 10}}>
            <FileBox />
        </div>
    </>;
}


export default WindowCom;
