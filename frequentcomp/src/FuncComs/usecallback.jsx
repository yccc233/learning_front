import React, {useState, useEffect, useCallback} from "react"
import {Button} from "antd";

var count = 0;

function Usecallback() {
    const [val, setVal] = useState("emmm");
    const [co, setCo] = useState(0);

    const getData = useCallback(() => {
        console.log("getData 渲染")
        setTimeout(()=>{
            count++;
            setVal('new data '+count);
        }, 1000)
    }, []);

    return (
        <div>
            <Child val={val} getData={getData} />
            <hr/>
            <Button type={"primary"} onClick={() => setCo(pre => pre+1)}>点我 +1 浅渲染组件 (当前为{co})</Button>
        </div>
    );
}

function Child({val, getData}) {
    useEffect(() => {
        getData();
    }, [getData]);

    return <div>{val}</div>;
}

export default Usecallback;
