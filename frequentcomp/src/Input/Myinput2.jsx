import React, {useCallback, useState} from "react";
import {Button} from "antd";
const $ = require("jquery");

function Myinput2() {

    // const ref = useRef();

    const [inputFilter, setInputFilter] = useState('');

    // eslint-disable-next-line
    const clear = useCallback(() => {
        // console.log(ref)
        // ref.current.state.value = '';
        setInputFilter('');
        $("#search").val('')
    });

    // eslint-disable-next-line
    const output = useCallback(() => {
        console.log(inputFilter)
    })

    return <div>
        <input id={"search"} style={{width: 100}} onChange={e => setInputFilter(e.target.value)}/>
        <Button onClick={output} type={"primary"}>输出</Button>
        <Button onClick={clear}>清空</Button>
    </div>
}

export default Myinput2;
