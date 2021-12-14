import React from "react";
import "./contextmenu.css";
import {Button} from "antd";

function MenuX(props) {
    const {pos} = props;

    const menuList = [{
        name: "主页",
        fn: function () {
            window.location.href = "/";
        }
    }, {
        name: "你好！",
        fn: function () {
            alert("hello！");
        }
    }]

    return (
        <div className={"menu"} style={{position: "absolute", left: pos.x, top: pos.y}}>
            {menuList.map(menu => {
                return <div>
                    <Button type={"link"} className={"self-button"} onClick={menu.fn}>{menu.name}</Button>
                </div>
            })}
        </div>
    );
}

export default MenuX;
