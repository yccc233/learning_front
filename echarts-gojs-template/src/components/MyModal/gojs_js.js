import {useCallback, useEffect} from "react";
import ds from "./data";
import * as go from "gojs";
import {Button} from "antd";
import "../../css/modal.css";
const $ = require("jquery");

/**
 * 请吃透包括
 * 结点、
 * 组件内置、
 * 线条、
 * 配置项、
 * 事件
 * 等知识点困难点
 */

// let circleTemplate = $(go.Node, "Auto",
//     $(go.Shape, {strokeWidth: 0}, 'Circle',
//         new go.Binding("fill", "color")),
//     $(go.TextBlock, {margin: 8},
//         new go.Binding("text", "key"))
// );


// let itemTemplate = $(go.Panel, "Horizontal",    //水平对齐
//     $(go.Shape,
//         {width: 10, height: 10, margin: 2, strokeWidth: 1, stroke: "#333"},
//         new go.Binding("figure", "figure"),
//         new go.Binding("fill", "color")),
//     $(go.TextBlock,
//         new go.Binding("text", "name")));
//
// let PanelTemplate = $(go.Node, "Auto",
//     {
//         fromSpot: go.Spot.AllSides,     //这两行是申明from与to结点的接口地点为全边，连线默认在各边中点
//         toSpot: go.Spot.AllSides,
//         isShadowed: true,               //结点阴影，好看
//         shadowColor: "#eee",
//         shadowOffset: new go.Point(5, 5)
//     },
//     $(go.Shape, "RoundedRectangle", {strokeWidth: 3, stroke: "#eee", fill: "white"}),
//     $(go.Panel, "Table",                //申明一个table类型的画布
//         $(go.TextBlock,
//             {
//                 row: 0,
//                 margin: new go.Margin(5, 15, 5, 15)
//             },
//             new go.Binding("text", "key")),
//         $("PanelExpanderButton", "list", {row: 0, alignment: go.Spot.Right}),   //设计一个按钮，功能PanelExpand，设计对象名称为list
//         $(go.Panel, "Vertical",
//             {
//                 name: "list",       //申明画布名称为list，与PanelExpanderButton对应
//                 row: 1,
//                 defaultAlignment: go.Spot.Left,
//                 itemTemplate: itemTemplate  //子画布模版申明
//             },
//             new go.Binding("itemArray", "items")
//         ))
// );
//
// let PanelLinkTemplate = $(go.Link,
//     {
//         selectionAdorned: true,
//         layerName: "Foreground",
//         routing: go.Link.Orthogonal,    //更改水平垂直方向线
//         corner: 5,      //拐角弧度
//         curve: go.Link.JumpOver
//     },
//     $(go.Shape, {stroke: "#aaa", strokeWidth: 2}),
//     $(go.TextBlock,
//         {
//             segmentIndex: 0,    //from 标签
//             segmentOffset: new go.Point(NaN, NaN),
//             segmentOrientation: go.Link.OrientUpright
//         },
//         new go.Binding("text", "text")),
//
//     $(go.TextBlock,
//         {
//             segmentIndex: -1,    //to 标签
//             segmentOffset: new go.Point(NaN, NaN),
//             segmentOrientation: go.Link.OrientUpright
//         },
//         new go.Binding("text", "toText")),
//     $(go.Shape,
//         {toArrow: "Standard", fill: "#aaa", stroke: null}),
// );



function GoJSModal_Js() {
    const $ = go.GraphObject.make;
    //配置基本属性定义
    let diagram;

    const initDiagram = (canvas, nodes, links) => {
        //配置项初始化
        diagram = $(go.Diagram, canvas, {
            initialContentAlignment: go.Spot.Center,
            initialAutoScale: go.Diagram.Uniform,   //自动占满屏幕，根据自己需求，可能导致字体看起来较小
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //设置鼠标滚轮不是上下滑动，而是画布大小调整
            layout: $(go.ForceDirectedLayout),      // 布局管理，否则挤在一起视觉效果很差
        });

        const circleTemplate = $(go.Node, "Auto",
            {
                fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides
            },
            $(go.Shape, {strokeWidth: 0}, 'Circle',
                new go.Binding("fill", "color")),
            $(go.TextBlock, {margin: 8},
                new go.Binding("text", "key"))
        );

        diagram.nodeTemplate = circleTemplate;
        // diagram.linkTemplate = PanelLinkTemplate;
        diagram.model = new go.GraphLinksModel(nodes, links)

        diagram.commit(function(d) {  // d === diagram
            d.nodes.each(function(node) {
                if (node.data.key !== "one")
                    node.scale = 0.5;   //修改比例
            });
        }, "decrease scale");
    }


    //定义结点、关系和画布
    useEffect(() => {

        setTimeout(() => {
            initDiagram("myCanvas", ds.sNodes, ds.sLinks);

        }, 100);
    }, []);

    const triggerDiagram = useCallback((e) => {
        diagram.commit((d) => {
            d.selection.each(node => {
                console.log(node)
                var shape = node.findObject("SHAPE");
                // If there was a GraphObject in the node named SHAPE, then set its fill to red:
                if (shape !== null) {
                    shape.fill = "red";
                }
            });
        }, "change color");
    }, []);


    return <>
        <div id="myCanvas" className="diagram-style"/>
        <div>
            <Button type="primary" id="diagramTrigger" onClick={triggerDiagram}>触发diagram事件</Button>
        </div>
    </>
}

export default GoJSModal_Js;

