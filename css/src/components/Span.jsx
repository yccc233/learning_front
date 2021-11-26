import React from "react";


export default function Span(props) {

    return <>
        <span className={props.className} style={props.style}>
            <div style={{height: "49px", width: "100%", background: "white"}}>
                <h4 style={{marginLeft: "10px", float: "left"}}>{props.title}</h4>
                <h4 style={{marginRight: "10px", float: "right"}}>{props.cssp}</h4>
            </div>
            {props.children}
        </span>
    </>;
}
