
import {useState} from "react";
import "./myDrag.css";

function MyDrag() {
    
    const [initTop, setInitTop] = useState(10);
    const [initLeft, setInitLeft] = useState(10);
    
    const [moveTop, setMoveTop] = useState(0);
    const [moveLeft, setMoveLeft] = useState(0);
    
    const [count, setCount] = useState(0);

    const onDragStart = event => {
        console.log("onDragStart", event, event.pageY, event.pageX)
        sessionStorage.setItem("boxPos", JSON.stringify({
            x: event.clientX,
            y: event.clientY,
        }))
    }

    const onDrag = (event) => {
        // eslint-disable-next-line eqeqeq
        count % 50 === 0 && console.log("onDrag", count, event)
        setCount(pre => pre+1);
        if (event.pageX < 10)
            return ;
        
        setMoveLeft(event.pageX - initLeft);
        setMoveTop(event.pageY - initTop);
    }

    const onDragEnd = event => {
        console.log("onDragEnd", event, event.pageY, event.pageX)
        // if (event.pageX < 10)
        //     return ;
        setInitLeft(10 + moveLeft);
        setInitTop(10 + moveTop);
        setMoveTop(0);
        setMoveLeft(0);
    }


    return <>
        <div className={"box"} draggable={true}
             style={{left: `${initLeft + moveLeft}px`, top: `${initTop + moveTop}px`}}
             onDrag={onDrag}
             onDragStart={onDragStart}
             onDragEnd={onDragEnd}
        />
        <span className={"box"} style={{width: "10px", height: "10px", background: "#aaa"}} />
    </>
    
}

export default MyDrag;