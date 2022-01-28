/**
 * 公司对人（编辑）
 */

import React, {useCallback, useEffect, useRef} from "react";
import go from "gojs"
import {Button} from "antd";
import {column} from "gojs/extensionsTS/DrawCommandHandlerScript";

const $ = go.GraphObject.make;

const bluegbk = '#1890FF';
const whitebk = '#FFFFFF';
const data = [
    { key: "特斯拉xxxxxx", name: "特斯拉xxxxxx", color: bluegbk, category: "company" },
    { key: "张安", parent:"特斯拉xxxxxx", name: "张安", money: 200, anteil: "10%", color: whitebk, category: "people" },
    { key: "李四", parent:"特斯拉xxxxxx", name: "李四", money: 400, anteil: "60%", color: whitebk, category: "people" },
    { key: "王五", parent:"特斯拉xxxxxx", name: "王五", money: 300, anteil: "30%", color: whitebk, category: "people" }
];

function Go2() {

    const diagram = useRef();

    const addPeople = useCallback(() => {
        var myDiagram = diagram.current;
        myDiagram.model.addNodeData({key: "xxxxxx", parent:"特斯拉xxxxxx", name: "xxxxxx", money: 0, anteil: "0%", color: whitebk, category: "people"});
    });

    const onCommit = useCallback(() => {
        let myDiagram = diagram.current;
        console.log(diagram)
        console.log("获取所有信息", JSON.parse(myDiagram.model.toJson()))
        console.log("获取所有节点", JSON.parse(myDiagram.model.toJson()).nodeDataArray)

    })

    const onChange = useCallback((textBlock, previousText, currentText) => {
        console.log(textBlock, previousText, currentText)
    })


    useEffect(() => {
        var myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 })
            });
        myDiagram.nodeTemplateMap.add("company", $(go.Node, "Auto",
            new go.Binding("background", "color"),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, {column: 2}),
                $(go.TextBlock, {row: 0, column: 0, margin: 20, font: "bold 20px sans-serif", stroke: '#fff' }, new go.Binding("text", "name")),
                $("Button", {row: 0, column: 1,  margin: 2, click: addPeople}, $(go.TextBlock, " + ")))
        ));

        myDiagram.nodeTemplateMap.add("people", $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
                {strokeWidth: 1, stroke: "#000", fill: "#fff"},
            ),
            $(go.Panel, "Table",
                $(go.RowColumnDefinition, {column: 3, width: 10}),
                    $(go.TextBlock, { margin: 5, row: 0, font: "bold 20px sans-serif", stroke: '#333', editable: true, textEdited: onChange }, new go.Binding("text", "name")),
                    $(go.TextBlock, { margin: 10, row: 1, font: "14px sans-serif", stroke: '#da3838', editable: true, textEdited: onChange }, new go.Binding("text", "money", function (v) {return `认证金额 ${v} 万人民币`;})),
                    $(go.TextBlock, { margin: 5, row: 2, font: "14px sans-serif", stroke: '#325ece', editable: true, textEdited: onChange }, new go.Binding("text", "anteil", function (v) {return `占比 ${v}`;}))
            )
        ));

        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape
        var model = $(go.TreeModel);
        model.nodeDataArray = data
        myDiagram.model = model;
        diagram.current = myDiagram;
        //done
    }, [])



    return <div style={{display: "flex", padding: 20}}>
        <div id={"myDiagramDiv"} style={{
            width: 800,
            height: 500,
            border: "1px solid #000",
        }} />
        <div style={{}}>
            <Button type={"primary"} onClick={onCommit}>提交</Button>
        </div>
    </div>
}

export default Go2;
