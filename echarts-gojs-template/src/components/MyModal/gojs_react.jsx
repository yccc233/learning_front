
import {useCallback} from "react";
import {ReactDiagram} from "gojs-react";
import * as go from "gojs";
import ds from "./data";
import "../../css/modal.css";

function GoJSModal_React() {
    const $ = go.GraphObject.make;
    //配置基本属性定义
    let diagram;

    const initDiagram = useCallback(() => {
        //配置项初始化
        diagram = $(go.Diagram, {
            initialContentAlignment: go.Spot.Center,
            initialAutoScale: go.Diagram.Uniform,   //自动占满屏幕，根据自己需求，可能导致字体看起来较小
            "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //设置鼠标滚轮不是上下滑动，而是画布大小调整
            layout: $(go.ForceDirectedLayout),      // 布局管理，否则挤在一起视觉效果很差
            // import 这里需要申明关系的key属性，react特别重要
            model: $(go.GraphLinksModel, {
                linkKeyProperty: "key"
            })
        });

        //定义画布背景，这里用eee色的网格线，网格大小为15x15
        diagram.grid = $(go.Panel, go.Panel.Grid,
            {gridCellSize: new go.Size(30, 30)},
            $(go.Shape, "LineV", {stroke: "#eee"}),
            $(go.Shape, "LineH", {stroke: "#eee"}));

        let itemTemplate = $(go.Panel, "Horizontal",    //水平对齐
            $(go.Shape,
                {width: 10, height: 10, margin: 2, strokeWidth: 1, stroke: "#333"},
                new go.Binding("figure", "figure"),
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                new go.Binding("text", "name")));

        let PanelTemplate = $(go.Node, "Auto",
            {
                fromSpot: go.Spot.AllSides,     //这两行是申明from与to结点的接口地点为全边，连线默认在各边中点
                toSpot: go.Spot.AllSides,
                isShadowed: true,               //结点阴影，好看
                shadowColor: "#eee",
                shadowOffset: new go.Point(5, 5)
            },
            $(go.Shape, "RoundedRectangle", {strokeWidth: 3, stroke: "#eee", fill: "white"}),
            $(go.Panel, "Table",                //申明一个table类型的画布
                $(go.TextBlock,
                    {
                        row: 0,
                        margin: new go.Margin(5, 15, 5, 15)
                    },
                    new go.Binding("text", "key")),
                $("PanelExpanderButton", "list", {row: 0, alignment: go.Spot.Right}),   //设计一个按钮，功能PanelExpand，设计对象名称为list
                $(go.Panel, "Vertical",
                    {
                        name: "list",       //申明画布名称为list，与PanelExpanderButton对应
                        row: 1,
                        defaultAlignment: go.Spot.Left,
                        itemTemplate: itemTemplate  //子画布模版申明
                    },
                    new go.Binding("itemArray", "items")
                ))
        );

        let PanelLinkTemplate = $(go.Link,
            {
                selectionAdorned: true,
                layerName: "Foreground",
                routing: go.Link.Orthogonal,    //更改水平垂直方向线
                corner: 5,      //拐角弧度
                curve: go.Link.JumpOver
            },
            $(go.Shape, {stroke: "#aaa", strokeWidth: 2}),
            $(go.TextBlock,
                {
                    segmentIndex: 0,    //from 标签
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright
                },
                new go.Binding("text", "text")),

            $(go.TextBlock,
                {
                    segmentIndex: -1,    //to 标签
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright
                },
                new go.Binding("text", "toText")),
            $(go.Shape,
                {toArrow: "Standard", fill: "#aaa", stroke: null}),
        );

        diagram.nodeTemplate = PanelTemplate;
        diagram.linkTemplate = PanelLinkTemplate;

        return diagram;
    }, []);

    return <>
        <ReactDiagram
            initDiagram={initDiagram}
            divClassName="diagram-style"
            nodeDataArray={ds.pNodes}
            linkDataArray={ds.pLinks}
        />
    </>
}

export default GoJSModal_React;

