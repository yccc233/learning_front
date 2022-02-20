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

function Go2() {
    const diagram = useRef();

    const addPeople = () => {
        let myDiagram = diagram.current;
        let nodeArr = JSON.parse(diagram.current.model.toJson()).nodeDataArray;
        myDiagram.model.addNodeData({key: +nodeArr[nodeArr.length - 1].key + 1 + '', parent:"0", name: "[\\输入姓名]", money: 0, anteil: "0%", color: whitebk, category: "people"});
    }

    const onCommit = () => {
        let myDiagram = diagram.current;
        console.log("获取所有节点", JSON.parse(myDiagram.model.toJson()).nodeDataArray)
    }


    const onChange = (textBlock, previousText, currentText, type) => {
        if (previousText === currentText) return;
        let myDiagram = diagram.current;
        // eslint-disable-next-line
        let nodeData = JSON.parse(myDiagram.model.toJson()).nodeDataArray.find(arr => arr[type] == previousText);
        if (nodeData) {
            let node = myDiagram.model.findNodeDataForKey(nodeData.key);
            myDiagram.model.setDataProperty(node, type, type === "money" ? +currentText : currentText);
        }
        else console.log("错误：找不到节点！")
    }


    useEffect(() => {
        var myDiagram = $(go.Diagram, "myDiagramDiv",
            {
                "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                    { angle: 90, layerSpacing: 50, nodeSpacing: 100 }),
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
                $(go.RowColumnDefinition, {column: 1, width: 10}),
                $(go.TextBlock, { margin: 5, row: 0, font: "bold 20px sans-serif", stroke: '#333', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"name") }, new go.Binding("text", "name")),
                //或者使用makeTwoWay方法来跟踪变化
                // $(go.TextBlock, { margin: 5, row: 0, font: "bold 20px sans-serif", stroke: '#333', editable: true }, new go.Binding("text", "name").makeTwoWay()),
                $(go.Panel, "Horizontal",{margin: 5, row: 1},
                    $(go.TextBlock, "认证金额"),
                    $(go.TextBlock, {stroke: '#da3838', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"money")}, new go.Binding("text", "money")),
                    $(go.TextBlock, "万人民币")),
                $(go.Panel, "Horizontal",{margin: 5, row: 2},
                    $(go.TextBlock, "占比"),
                    $(go.TextBlock, {stroke: '#325ece', editable: true, textEdited: (a,b,c) => onChange(a,b,c,"anteil")}, new go.Binding("text", "anteil")))
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
