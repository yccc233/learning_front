/**
 * 公司对人（仅查看）
 */

import React, {useEffect} from "react";
import go from "gojs"

const $ = go.GraphObject.make;

const bluegbk = '#1890FF';
const whitebk = '#FFFFFF';
const data = [
    { key: "0", name: "特斯拉xxxxxx", color: bluegbk, category: "company" },
    { key: "1", parent:"0", name: "张安", money: 200, anteil: "10%", color: whitebk, category: "people" },
    { key: "2", parent:"0", name: "李四", money: 400, anteil: "60%", color: whitebk, category: "people" },
    { key: "3", parent:"0", name: "王五", money: 300, anteil: "30%", color: whitebk, category: "people" }
];

function Go1() {

    useEffect(() => {
        var myDiagram =
            $(go.Diagram, "myDiagramDiv",
                {
                    "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                    layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                        { angle: 90, layerSpacing: 50, nodeSpacing: 100 }),
                    allowDelete: false,
                    allowCopy: false
                });
        myDiagram.nodeTemplateMap.add("company", $(go.Node, "Auto",
            new go.Binding("background", "color"),
            $(go.Panel, "Table",
                $(go.TextBlock, { margin: 20, font: "bold 24px sans-serif", stroke: '#fff' }, new go.Binding("text", "name")))
        ));

        myDiagram.nodeTemplateMap.add("people", $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
                {strokeWidth: 1, stroke: "#000", fill: "#fff"}),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, {column: 1, width: 10}),
                $(go.TextBlock, { margin: 5, row: 0, font: "bold 16px sans-serif", stroke: '#333' }, new go.Binding("text", "name")),
                $(go.Panel, "Horizontal",{margin: 5, row: 1},
                    $(go.TextBlock, "认证金额"),
                    $(go.TextBlock, {stroke: '#da3838', margin: 2}, new go.Binding("text", "money")),
                    $(go.TextBlock, "万人民币")),
                $(go.Panel, "Horizontal",{margin: 5, row: 2},
                    $(go.TextBlock, "占比"),
                    $(go.TextBlock, {stroke: '#325ece', margin: 2}, new go.Binding("text", "anteil")))
            )
        ));

        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 3, stroke: "#555" }));

        var model = $(go.TreeModel);
        model.nodeDataArray = data
        myDiagram.model = model;

        //done
    }, [])

    return <div id={"myDiagramDiv"} style={{
        width: 1000,
        height: 400,
        border: "1px solid #000",
        margin: 20
    }} />

}

export default Go1;



// var myDiagram = $(go.Diagram, "myDiagramDiv",
//     {
//         "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
//         layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
//             { angle: 90, layerSpacing: 35 })
//     });
//
// myDiagram.nodeTemplateMap.add("company",
//     $(go.Node, "Auto",  // the Shape will go around the TextBlock
//         // {
//         //     fromSpot: go.Spot.Bottom,
//         //     fromLinkable: true,
//         //     toLinkable: false
//         // },
//         $(go.Shape, "RoundedRectangle", { strokeWidth: 1, fill: "black" },
//             new go.Binding("fill", "color")),
//         $(go.TextBlock,
//             { margin: 8, font: "bold 14px sans-serif", stroke: '#333' },
//             new go.Binding("text", "name"))
//     ));
//
// myDiagram.nodeTemplateMap.add("people",
//     $(go.Node, "Auto",
//         $(go.Shape, "RoundedRectangle", { strokeWidth: 1, fill: "black" },
//             new go.Binding("fill", "color")),
//         $(go.Panel, "Table",
//             $(go.RowColumnDefinition, { column: 1, width: 4 }),
//             $(go.TextBlock, { font: "9pt  Segoe UI,sans-serif" },
//                 {
//                     row: 0,
//                     column: 1,
//                     columnSpan: 5,
//                     font: "12pt Segoe UI,sans-serif",
//                     editable: true, isMultiline: false,
//                     minSize: new go.Size(10, 16)
//                 },
//                 new go.Binding("text", "name").makeTwoWay()),
//             $(go.TextBlock, { font: "9pt  Segoe UI,sans-serif" },
//                 { row: 1, column: 0 },
//                 new go.Binding("text", "money", function (v) {return `认证金额${v}万人民币`;})),
//             $(go.TextBlock, { font: "9pt  Segoe UI,sans-serif" },
//                 { row: 2, column: 0 },
//                 new go.Binding("text", "anteil", function (v) {return `授权占比${v}`;}))
//         )
//     ));
//
// myDiagram.linkTemplate =
//     $(go.Link,
//         { routing: go.Link.Orthogonal, corner: 5 },
//         $(go.Shape, { strokeWidth: 3, stroke: "#555" }));
// // myDiagram.linkTemplate =
// //     $(go.Link,
// //         { routing: go.Link.Orthogonal, corner: 5, selectable: false },
// //         $(go.Shape));
//
// myDiagram.nodeDataArray =
//     // [
//     //     { from: "特斯拉xxxxxx", to: "张安" },
//     //     { from: "特斯拉xxxxxx", to: "李四" },
//     //     { from: "特斯拉xxxxxx", to: "王五" }
//     // ]
//     myDiagram.model = $(go.TreeModel);
