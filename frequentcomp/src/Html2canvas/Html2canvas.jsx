
import React, {useState} from "react";
import {Button, Calendar, Image} from "antd";
import html2canvas from "html2canvas";
import './html2cnavas.css';

function Html2canvas() {

    const [img, setImg] = useState();

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    }

    const shotScreen = () => {
        html2canvas(document.querySelector("#canvas")).then( canvas => {
            console.log(canvas.toDataURL("img/png"))
            setImg(canvas.toDataURL("img/png", 0.09));
        })
    }

    return (
        <div>

            <div className={"hoverr"}>
                <Button type={"link"} onClick={shotScreen}>截屏</Button>
                <div id={"box"}><Image src={img}/></div>
            </div>
            <div style={{padding: "5px 100px"}} id={"canvas"}>
                <Calendar onPanelChange={onPanelChange} />
            </div>
        </div>
    );
}

export default Html2canvas;

