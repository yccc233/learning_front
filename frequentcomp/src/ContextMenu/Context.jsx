
import React, {useEffect, useState} from "react";
import "./contextmenu.css";
import MenuX from "./Menu";
import {Dropdown, Menu} from "antd";

function ContextX() {

    const [isMenu, setIsMenu] = useState(false);
    const [pos, setPos] = useState();

    const handleMenu = (event) => {
        console.log(event)
        event.preventDefault();
        setIsMenu(true);
        setPos({
            x: event.pageX,
            y: event.pageY
        })
    }

    useEffect(() => {
        window.addEventListener("click", event => {
            setIsMenu(false);
        });
    }, []);

    return [
        <div className={"context-menu"}>
            <div className={"context-box"} onContextMenu={handleMenu}>
                右击我是一个菜单
            </div>
            {isMenu && <MenuX pos={pos} setMenu={setIsMenu}/>}
        </div>,
        <Dropdown trigger={['contextMenu']} overlay={
            <Menu>
                <Menu.Item key={"1"}>Item菜单</Menu.Item>
                <Menu.Item key={"2"}>同上</Menu.Item>
                <Menu.Divider />
                <Menu.SubMenu key={"3"} title={"SubMenu菜单"}>
                    <Menu.Item key={"4"}>子Item菜单</Menu.Item>,
                    <Menu.Item key={"5"}>同上</Menu.Item>
                </Menu.SubMenu>
                <Menu.Divider dashed />
                <Menu.ItemGroup key={"6"} title={"ItemGroup菜单"}>
                    <Menu.Item key={"7"}>子Item菜单</Menu.Item>,
                    <Menu.Item key={"8"}>同上</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        }>
            <div className={"right-context-menu"}>
                右击我也是一个菜单
            </div>
        </Dropdown>
        ];
}

export default ContextX;
