import React, {useState} from "react";
import {Button} from "antd";

function Box() {

    const [message, setMessage]= useState();

    const Alert = () => {
        setMessage("alert")
        alert("你点击了alert，当前进程阻塞！")
    }

    const Confirm = () => {
        // eslint-disable-next-line no-restricted-globals
        var flag = confirm("确定吗?")
        setMessage(flag ? "你点击了确定" : "你点击了取消");
    }

    const Prompt = () => {
        var flag = prompt("请输入", "123")
        setMessage(flag);
    }

    return <>
        <Button onClick={Alert}>alert</Button>
        <Button onClick={Confirm}>confirm</Button>
        <Button onClick={Prompt}>prompt</Button>
        <div>{message}</div>
    </>
}


export default Box;
