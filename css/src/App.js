import './App.less';
import React from "react";
import TimeClock from "./components/timeclock";

function App() {


    return (
        <div>
            <div className="App">
                <span className={"learn1"}>
                    文本在div水平竖直中心
                </span>
                    <span className={"learn2"}>
                    <span style={{color: "lightpink"}}>（文本溢出，可以使用滚轮滑动）</span>
                    孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。
                </span>
                    <span className={"learn3"}>
                    <span style={{color: "lightpink"}}>（单行，...省略）</span>
                    孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。
                </span>
                    <span className={"learn4 learn2"}>
                    <span style={{color: "lightpink"}}>（文本模糊）</span>
                    孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。
                </span>
                    <span className={"learn5"}>
                    <h2>动画视觉</h2>
                </span>
                    <span>
                    <h2>下面这是一个三角形</h2>
                    <div className={"learn6"} />
                </span>
            </div>
            <div className="App">
                <span style={{textAlign: "center"}}>
                    <h4>这是一个时钟</h4>
                    <TimeClock />
                </span>
                <span style={{textAlign: "center"}}>
                    <h4>悬浮画板</h4>
                    <div className={""}>

                    </div>
                </span>
            </div>
        </div>
    );
}



export default App;
