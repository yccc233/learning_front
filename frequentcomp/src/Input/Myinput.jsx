import React, {useCallback, useRef, useState} from "react";
import {Input} from "antd";


function MyInput(props) {

    let [content1, setContent1] = useState();
    let [content2, setContent2] = useState();
    let currentInput = useRef();

    /**
     * 延迟对准输出
     * @type {(function(*): void)|*}
     */
    const delayResponse = useCallback(e => {
        e.persist(); //V17不再生效
        currentInput.current && clearTimeout(currentInput.current);
        currentInput.current = setTimeout(() => {
            setContent2(e.target.value);
        }, 1000);
    }, []);

    return <div style={{padding: "10px 100px"}}>
        <Input onChange={e => setContent1(e.target.value)} placeholder={"实时显示"}/>
        <br />
        <div>
            {content1}
        </div>
        <br /><br /><br />
        <Input onChange={delayResponse} placeholder={"延时一秒显示"}/>
        <br />
        <div>
            {content2}
        </div>
    </div>
}

export default MyInput;
