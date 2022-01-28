/**
 * 公司对人（编辑）
 */

import React, {useEffect, useRef} from "react";
import go from "gojs"
import {Button} from "antd";

const $ = go.GraphObject.make;

const bluegbk = '#1890FF';
const whitebk = '#FFFFFF';
const data = [
    { key: "0", name: "特斯拉xxxxxx", color: bluegbk, category: "company" },
    { key: "1", parent:"0", name: "张安", money: 200, anteil: "10%", color: whitebk, category: "people" },
    { key: "2", parent:"0", name: "李四", money: 400, anteil: "60%", color: whitebk, category: "people" },
    { key: "3", parent:"0", name: "王五", money: 300, anteil: "30%", color: whitebk, category: "people" }
];

function SplitstrFromStr(str, type) {
    if (type === "name") return str;
    return str.split(" ")[1];
}

function Go2() {
    const diagram = useRef();

    const addPeople = () => {
        var myDiagram = diagram.current;
        myDiagram.model.addNodeData({key: "" + JSON.parse(diagram.current.model.toJson()).nodeDataArray.length, parent:"0", name: "xxxxxx", money: 0, anteil: "0%", color: whitebk, category: "people"});
    }

    const onCommit = () => {
        let myDiagram = diagram.current;
        console.log("获取所有节点", JSON.parse(myDiagram.model.toJson()).nodeDataArray)
    }


    const onChange = (textBlock, previousText, currentText, type) => {
        if (previousText === currentText) return;
        let pv = SplitstrFromStr(previousText, type),
            cv = SplitstrFromStr(currentText, type);
        let nodeData = JSON.parse(diagram.current.model.toJson()).nodeDataArray.find(arr => arr[type] == pv);
        if (nodeData) {
            let node = diagram.current.model.findNodeDataForKey(nodeData.key);
            diagram.current.model.setDataProperty(node, type, type === "money" ? +cv : cv);
        }
        else console.log("错误：找不到节点！")
    }


    useEffect(() => {
        var myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 35 }),
                allowDelete: false,
                allowCopy: false
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
                    $(go.TextBlock, { margin: 5, row: 0, font: "bold 20px sans-serif", stroke: '#333', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"name") }, new go.Binding("text", "name")),
                    $(go.TextBlock, { margin: 5, row: 1, font: "12px sans-serif", stroke: '#da3838', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"money") }, new go.Binding("text", "money", function (v) {return `认证金额 ${v} 万人民币`;})),
                    $(go.TextBlock, { margin: 5, row: 2, font: "12px sans-serif", stroke: '#325ece', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"anteil") }, new go.Binding("text", "anteil", function (v) {return `占比 ${v}`;}))
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
            width: 1000,
            height: 500,
            border: "1px solid #000",
        }} />
        <div style={{}}>
            <Button type={"primary"} onClick={onCommit}>提交</Button>
        </div>
    </div>
}

export default Go2;
