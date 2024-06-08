/**
 * g2使用
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { RadialTreeGraph } from '@ant-design/graphs';




const DemoRadialTreeGraph = () => {
    const themeColor = '#73B3D1';
    const nodeCfg = {
        size: 50,
        type: 'circle',
        label: {
            style: {
                fill: '#fff',
            },
        },
        style: {
            fill: themeColor,
            stroke: '#0E1155',
            lineWidth: 2,
            strokeOpacity: 0.45,
            shadowColor: themeColor,
            shadowBlur: 25,
        },
        nodeStateStyles: {
            hover: {
                stroke: themeColor,
                lineWidth: 2,
                strokeOpacity: 1,
            },
        },
    };
    const edgeCfg = {
        style: {
            stroke: themeColor,
            shadowColor: themeColor,
            shadowBlur: 20,
        },
        endArrow: {
            type: 'triangle',
            fill: themeColor,
            d: 15,
            size: 8,
        },
        edgeStateStyles: {
            hover: {
                stroke: themeColor,
                lineWidth: 2,
            },
        },
    };
    // const toolbarCfg = {
    //     show: true,
    //     renderIcon: () => {
    //         return <div style={{width: 100, height: 100}}>
    //             wc
    //         </div>
    //     }
    // };
    // const tooltipCfg = {
    //     show: true,
    //     style:{background: "#aaa",position: "absolute", top: 10, left: 10},
    //     customContent: (item) => {
    //         console.log("customContent", item)
    //         return <div style={{width: 100, height: 100, }}>
    //             a?
    //         </div>
    //     }
    // };
    const onReady = (graph) => {
        graph.on('node:contextmenu', (evt) => {
            // console.log("node:contextmenu", evt);
            evt.preventDefault();
            setMenu({
                show: true,
                x: evt.canvasX,
                y: evt.canvasY,
                target: evt.currentTarget.cfg.data
            })
        });
        graph.on('click', (evt) => {
            // console.log("click", evt, menu);
            setMenu({show: false});
        });
    };

    const [data, setData] = useState();
    const [menu, setMenu] = useState({show: false});
    const [attrs, setAttrs] = useState();

    // 初始化
    useEffect(() => {
        setData({
            id: "ycc",
            value: "ycc",
            children: []
        });
        setAttrs(["身份证", "手机号", "住址"]);
    }, []);

    console.log("args", menu)
    return (
        <div
            id="g2"
            style={{
                width: "100%",
                background: '#0E1155',
                height: '100%',
                position:"relative"
            }}
        >
            {menu
                && menu.show
                && <div id={"ycc"} style={{
                    zIndex: 1,
                    position: "absolute",
                    left: menu.x,
                    top: menu.y,
                    width: 100,
                    height: 100,
                    border: "1px solid #aaa"
                }}>
                    {attrs.map((attr, i) => (<div
                        key={"kkkk"+ i}
                        style={{}}
                        onClick={() => {console.log("todo", menu, attr)}}
                    >
                        {attr}
                    </div>))}
                </div>}
            {
                data && <RadialTreeGraph
                    nodeCfg={nodeCfg}
                    edgeCfg={edgeCfg}
                    // tooltipCfg={tooltipCfg}
                    // toolbarCfg={toolbarCfg}
                    onReady={onReady}
                    data={data}
                />
            }
        </div>
    );
};

export default function init() {
    ReactDOM.render(<DemoRadialTreeGraph />, document.getElementById('rg5'));
}
