
import React, {useEffect, useState} from "react";
import "./contextmenu.css";
import MenuX from "./Menu";

function ContextX() {

    const [isMenu, setIsMenu] = useState(false);
    const [pos, setPos] = useState();

    const handleMenu = (event) => {
        console.log(event)
        event.preventDefault();
        setIsMenu(true);
        setPos({
            x: event.clientX,
            y: event.clientY
        })
    }

    useEffect(() => {
        window.addEventListener("click", event => {
            setIsMenu(false);
        });
    }, []);

    return (
        <div className={"context-menu"}>
            <div className={"context-box"} onContextMenu={handleMenu}>
                右击我是一个菜单
            </div>
            {isMenu && <MenuX pos={pos} setMenu={setIsMenu}/>}
        </div>
    );
}

export default ContextX;