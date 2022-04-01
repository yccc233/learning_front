
import React, {useState} from "react";
import "./myDrag.css";
import Draggable from "react-draggable";
import {Button} from "antd";

function SelfDrag() {

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


function DragButton() {

    return <>
        <Draggable
            // axis="x"
            // handle=".handle"
            // defaultPosition={{x: 0, y: 0}}
            // position={null}
            // grid={[25, 25]}
            // scale={1}
            // onStart={null}
            // onDrag={null}
            // onStop={null}>
        >
            <div>
                <Button>拖动啊</Button>
                <Button>也能拖</Button>
            </div>

        </Draggable>
    </>
}

const MyDrag = () => (
    <>
        <SelfDrag />
        <div style={{height: 150}} />
        <DragButton />
        <div>合理合理合理合理合理合理合理合理</div>
    </>
)

export default MyDrag;
