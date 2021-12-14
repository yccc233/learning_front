
import React, {useRef, useState} from "react";

import "./dynawin.css";
import {Button, Dropdown, Menu} from "antd";
import {DownOutlined} from "@ant-design/icons";

const {Item} = Menu;

const DynaWin = () => {

    const menu = <Menu>
        <Item key={1}>
            <Button type={"link"} onClick={() => setSlt(1)}>静态布局</Button>
        </Item>
        <Item key={2}>
            <Button type={"link"} onClick={() => setSlt(2)}>动态布局</Button>
        </Item>
    </Menu>;

    const [slt, setSlt] = useState(1);

    return <div>
        <Dropdown overlay={menu}>
            <span className="ant-dropdown-link">
                {slt === 1 ? "静态布局" : "动态布局"} <DownOutlined />
            </span>
        </Dropdown>
        {(function () {
            switch (slt) {
                case 2:
                    return <DynaWin2 />
                default:
                    return <DynaWin1 />
            }
        })()}
    </div>;
}

//第一种
const DynaWin1 = () => {

    const [leftPx, setLeft] = useState(200);
    let sta;

    const dragstart = (event) => {
        console.log(event)
        sta = event.clientX;
    }

    const dragend = (event) => {
        console.log(event)
        setLeft(leftPx + event.clientX - sta);
    }

    return <div id={"Box"}>
        <div id={"lbox"} style={{width: leftPx}}>
        </div>
        <div id={"dragline"} draggable onDragStart={dragstart} onDragEnd={dragend}/>
        <div id={"rbox"}>
        </div>
    </div>
}

//第二种
const DynaWin2 = () => {

    const [dev, setDev] = useState(0);
    const ind = useRef(0);
    let sta = 200;

    const dragend = (event) => {
        setDev(event.pageX - sta - 20);
    }

    const drag = (event) => {
        if (!(ind.current % 5) && event.pageX && event.pageX - sta) {
            setDev(event.pageX - sta - 20);
        }
        ind.current ++;
    }

    return <div id={"Box"}>
        <div id={"lbox"} style={{width: 200 + dev}}>
        </div>
        <div id={"dragline"} draggable onDragEnd={dragend} onDrag={drag}/>
        <div id={"rbox"}>
        </div>
    </div>
}



export default DynaWin;
