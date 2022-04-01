import './App.less';
import React from "react";
import TimeClock from "./components/timeclock";
import Span from "./components/Span";

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
                    <div style={{width: "100%", height: "76%", display: "flex"}}>
                        <div style={{flex: "1"}} />
                        <div className={"learn7"} />
                        <div style={{flex: "1"}} />
                        <div className={"learn7hov"} />
                        <div style={{flex: "1"}} />
                    </div>
                </span>
                <span style={{textAlign: "center"}}>
                    <h4>水珠</h4>
                    <div style={{width: "100%", height: "76%", display: "flex"}}>
                        <div style={{flex: "1"}} />
                        <div className={"dropIndex"} >
                            <span>孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下</span>
                            <div className={"drop drop1"} style={{borderRadius: "60% 40% 38% 62% / 60% 64% 36% 40%"}}/>
                            <div className={"drop2"} style={{borderRadius: "79% 21% 86% 14% / 62% 22% 78% 38%"}}/>
                            <div className={"drop3"} style={{borderRadius: "65% 35% 49% 51% / 62% 29% 71% 38% "}}/>

                        </div>
                        <div style={{flex: "1"}} />
                    </div>
                </span>
                <span style={{textAlign: "center"}}>
                    <h4>亮字</h4>
                </span>
                <span style={{textAlign: "center"}}>
                </span>
                <span style={{textAlign: "center"}}>
                </span>
            </div>
            <hr/>
            <em>跟随css学习脚步</em>
            <hr/>
            <div className={"App"}>
                <Span title={"1、背景样式"} cssp="background">
                    <div className={"css1"} style={{background: "url(/img/bqb.gif)center center no-repeat lightblue"}}>
                        孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。
                    </div>
                </Span>
                <Span title={"2、边框折叠"} cssp={"collapse"}>
                    <table className={"css2"} border={"border"}>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                        </tr>
                        <tr>
                            <td>Bill</td>
                            <td>Gates</td>
                        </tr>
                        <tr>
                            <td>Steven</td>
                            <td>Jobs</td>
                        </tr>
                    </table>
                </Span>
				<Span title={"3、图像剪裁(Chrome不支持)"} cssp={"clip"}>
                    <img src={"/img/xihuan.png"} width={"150px"} className={"css3"} alt={""}/>
                </Span>
                <Span title={"4、动画效果"} cssp={"@keyframe && animation"} className={"css4"}>
                    <div className={"moveDiv"} />
                </Span>
                <Span title={"5、外围轮廓"} cssp={"outline"}>
                    <div className={"css5"}>和border不一样，且在border外面</div>
                </Span>
                <Span title={"6、可自定义调整大小"} cssp={"resize"}>
                    <div className={"css6"}>需要和overflow配合使用，没有的话不显示移动控件！</div>
                </Span>
            </div>
            <div className={"App"}>
                <Span title={"7、段落缩进"} cssp={"text-indent"}>
                    <div className={"css7"}>孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。！</div>
                </Span>
                <Span title={"8、文本对齐"} cssp={"text-align: justify"}>
                    <div className={"css8"}>你可以和左边那栏对比。</div>
                    <div className={"css8"}>孤独这两个字拆开来看，有孩童，有瓜果，有小犬，有蚊蝇，足以撑起一个盛夏傍晚间的巷子口，人情味十足。稚儿擎瓜柳棚下，细犬逐蝶窄巷中，人间繁华多笑语，惟我空余两鬓风。孩童水果猫狗飞蝇当然热闹，可都和你无关，这就叫孤独。！</div>
                </Span>
                <Span title={"9（10）、文本阴影"} cssp={"text-shadow"} style={{background: "#333"}}>
                    <div className={"css9"}>这是文本。</div>
                    <div className={"css10"}>这是文本。</div>
                </Span>
                <Span title={"11、文本内破坏单词换行"} cssp={"word-break"}>
                    <div className={"css11"} style={{wordBreak: "normal"}}>this is a very long message width normal!</div>
                    <div className={"css11"} style={{wordBreak: "break-all"}}>this is a very long message width break-all!</div>
                    <div className={"css11"} style={{wordBreak: "keep-all"}}>this is a very long message width keep-all!</div>
                </Span>
                <Span title={"12、文字间距"} cssp={"word-spacing"}>
                    <div className={"css12"}>this is a very long message!</div>
                </Span>
                <Span title={"13、文字排列"} cssp={"writing-mode"}>
                    <div className={"css13"}>
                        <div style={{width: "375px", height: "500px"}}>
                            <table>
                                <tr>
                                    <th>value</th>
                                    <th>Vertical script</th>
                                    <th>Horizontal script</th>
                                    <th>Mixed script</th>
                                </tr>
                                <tr>
                                    <td>horizontal-tb</td>
                                    <td className="example Text1"><span>我家没有电脑。</span></td>
                                    <td className="example Text1"><span>Example text</span></td>
                                    <td className="example Text1"><span>1994年に至っては</span></td>
                                </tr>
                                <tr>
                                    <td>vertical-lr</td>
                                    <td className="example Text2"><span>我家没有电脑。</span></td>
                                    <td className="example Text2"><span>Example text</span></td>
                                    <td className="example Text2"><span>1994年に至っては</span></td>
                                </tr>
                                <tr>
                                    <td>vertical-rl</td>
                                    <td className="example Text3"><span>我家没有电脑。</span></td>
                                    <td className="example Text3"><span>Example text</span></td>
                                    <td className="example Text3"><span>1994年に至っては</span></td>
                                </tr>
                                <tr>
                                    <td>sideways-lr</td>
                                    <td className="example Text4"><span>我家没有电脑。</span></td>
                                    <td className="example Text4"><span>Example text</span></td>
                                    <td className="example Text4"><span>1994年に至っては</span></td>
                                </tr>
                                <tr>
                                    <td>sideways-rl</td>
                                    <td className="example Text5"><span>我家没有电脑。</span></td>
                                    <td className="example Text5"><span>Example text</span></td>
                                    <td className="example Text5"><span>1994年に至っては</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Span>
            </div>
            <div className={"App"}>
                <Span title={"14、格栅布局"} cssp={"grid"}>
                    <div className={"css14"}>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                        <div className={"item"}>666</div>
                    </div>
                </Span>
                <Span title={"15、图片圆形剪裁"} cssp={"clip-path"} style={{background: "lightblue"}}>
                    <div className={"css15"}>
                        <img src={"/img/xihuan.png"} width={100} alt={""}/>
                        <div className={"tiny"}>
                            这是一个span
                        </div>
                    </div>
                </Span>
                <Span title={"16、图片圆形旋转"} cssp={"animation"} >
                    <div className={"css16"}>
                        <img src={"/img/xihuan.png"} width={100} alt={""} className={"xuanzhuan"} />
                    </div>
                </Span>
            </div>
        </div>
    );
}



export default App;
