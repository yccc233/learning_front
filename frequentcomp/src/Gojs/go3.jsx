/**
 * 公司对人（仅查看）
 */

import React, {useEffect} from "react";
import go from "gojs"

const $ = go.GraphObject.make;

const bluegbk = '#1890FF';
const whitebk = '#FFFFFF';
const data = [
    { key: "特斯拉", name: "特斯拉", color: bluegbk, fontColor: whitebk },
    { key: "张安", name: "张安", color: whitebk },
    { key: "李四", name: "李四", color: whitebk },
    { key: "王五", name: "王五", color: whitebk },
    { key: "1", name: "1", color: whitebk },
    { key: "2", name: "2", color: whitebk },
    { key: "3", name: "3", color: whitebk },
    { key: "4", name: "4", color: whitebk },
    { key: "5", name: "5", color: whitebk },
    { key: "6", name: "6", color: whitebk },
];

const link = [
    { from: "李四", to: "特斯拉", text: "h" },
    { from: "2", to: "特斯拉", text: "hh" },
    { from: "6", to: "特斯拉", text: "hhh" },
    { from: "张安", to: "特斯拉", text: "hhhh" },
    { from: "特斯拉", to: "4", text: "hhhhh" },
    { from: "王五", to: "张安", text: "hhhhhh" },
    { from: "4", to: "1", text: "hhhhhhh" },
    { from: "4", to: "5", text: "hhhhhhhh" },
    { from: "3", to: "特斯拉", text: "hhhhhhhhhh" },
]

function Go3() {

    useEffect(() => {
        var myDiagram =
            $(go.Diagram, "myDiagramDiv",
                {
                    "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                    layout: $(go.ForceDirectedLayout),
                    allowDelete: false,
                    allowCopy: false,
                    initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
                    contentAlignment: go.Spot.Center,  // align document to the center of the viewport
                    // "LayoutCompleted": function(e) {
                    //     // now that the CircularLayout has finished, we know where its center is
                    //     var cntr = myDiagram.findNodeForKey("特斯拉");
                    //     cntr.location = myDiagram.layout.actualCenter;
                    // }
                })

        myDiagram.nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
                {strokeWidth: 1, stroke: "#000"},
                new go.Binding("fill", "color")
            ),
            $(go.TextBlock, { margin: 20, font: "bold 24px sans-serif" },
                new go.Binding("text", "name"),
                new go.Binding("stroke", "fontColor"))
        )

        myDiagram.linkTemplate =
            $(go.Link,  // the whole link panel
                {
                    routing: go.Link.AvoidsNodes,
                    corner: 5,
                    curve: go.Link.JumpOver
                },
                $(go.Shape),  // the link shape
                $(go.Shape, //from
                    {fromArrow:'Backward', strokeWidth:1 }),
                $(go.Shape,  // to
                    {  toArrow: "standard", strokeWidth:1  }),
                $(go.Panel, "Auto",
                    $(go.Shape, "Rectangle",{fill: "#eeeeee", strokeWidth: 0}),
                    $(go.TextBlock,  // the label text
                        {
                            textAlign: "center",
                            font: "10pt helvetica, arial, sans-serif",
                            stroke: bluegbk,
                            margin: 4
                        },
                        new go.Binding("text", "text"))
                )
            );

        myDiagram.model = new go.GraphLinksModel(data, link);

        //done
    }, [])

    return <div id={"myDiagramDiv"} style={{
        width: 1000,
        height: 400,
        border: "1px solid #000",
        margin: 20
    }} />

}

export default Go3;
