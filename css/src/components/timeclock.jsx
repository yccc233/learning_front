import React, {useEffect, useState} from "react";

const TimeClock = () => {

    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const drawTimeScale = () => {
        let ht = [];
        for (let i=0;i<60;i++) {

            if (i % 5 === 0) {
                ht.push(<div key={i} className={"scaleItemMiddle"} style={{
                    transform: `rotate(${6*i}deg)`,
                    fontSize: 12
                }}> {i / 5 || 12}
                </div>);
            } else {
                ht.push(<div key={i} className={"scaleItemSmall"} style={{
                    transform: `rotate(${6*i}deg)`
                }}>
                </div>);
            }
        }
        return ht
    }

    useEffect(() => {
        setInterval(() => {
            let date = new Date();
            setHour(date.getHours() + +(date.getMinutes() / 60).toFixed(1));
            setMinute(date.getMinutes() + +(date.getSeconds() / 60).toFixed(1));
            setSecond(date.getSeconds() + +(date.getMilliseconds() / 1000).toFixed(2));
        }, 1000);

    }, []);



    return <>
        <div className={"clock"}>
            {
                (drawTimeScale())
            }
            <div className={"hour"} style={{
                transform: `rotate(${hour / 12 * 360 - 1}deg)`
            }}/>
            <span className={"minute"} style={{
                transform: `rotate(${minute / 60 * 360 -1}deg)`
            }}/>
            <span className={"second"} style={{
                transform: `rotate(${second / 60 * 360 - 1}deg)`
            }}/>
            {/*<span className={"center"}/>*/}
        </div>
    </>
}

export default TimeClock;
