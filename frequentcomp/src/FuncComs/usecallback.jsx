import React, {useState, useEffect, useCallback} from "react"

var count = 0;

function Usecallback() {
    const [val, setVal] = useState("emmm");

    const getData = useCallback(() => {
        console.log("getData 渲染")
        setTimeout(()=>{
            count++;
            setVal('new data '+count);
        }, 1000)
    }, []);

    return (
        <Child val={val} getData={getData} />
    );
}

function Child({val, getData}) {
    useEffect(() => {
        getData();
    }, [getData]);

    return <div>{val}</div>;
}

export default Usecallback;
