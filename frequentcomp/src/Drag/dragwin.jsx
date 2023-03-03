import React, { Component } from 'react';
/**
 * @param {String} direction        拖动方向 column或row，默认row
 * @param {Number} firstSize        左/上侧大小，默认100
 * @param {Number} dragLineSize     拖拽线大小，默认2
 * @param {Number} dragLineColor    拖拽线颜色， 默认#eee
 * @param {ReactNode} firstChild    左侧子组件
 * @param {ReactNode} secondChild   右侧子组件
 */
class DragWin extends Component {
    constructor(props) {
        super(props);
        const { firstSize = 100, direction = "row" } = props;
        this.firstSize = firstSize;
        this.startP = -1;
        this.offset = 0;
        this.dragTime = 0;
        this.clientDirection = direction === "row" ? "clientX" : "clientY";
        this.changeDomProp = direction === "row" ? "width" : "height";
    }
    render() {
        const { direction = "row", dragLineSize = 3, dragLineColor = "#eee", firstChild, secondChild } = this.props;
        return <div id="drag-Win" style={{ width: "100%", height: "100%", display: "flex", flexDirection: direction }}>
            <div id="drag-Win-first" style={direction === "row" ? { width: this.firstSize } : { height: this.firstSize }}>
                {firstChild}
            </div>
            <div
                id="drag-line"
                draggable="true"
                style={{
                    background: dragLineColor,
                    cursor: direction === "row" ? "e-resize" : "ns-resize",
                    ...direction === "row" ? { width: dragLineSize, height: "100%" } : { width: "100%", height: dragLineSize }
                }}
                onDragStart={e => {
                    e.persist();
                    this.dragTime = 0;
                    this.startP = e[this.clientDirection];
                    this.offset = 0; console.log("start", this.startP, this.offset);
                }}
                onDrag={e => {
                    e.persist();
                    this.dragTime++;
                    if (this.dragTime % 2 === 0) {
                        this.offset = e[this.clientDirection] - this.startP;
                        document.getElementById("drag-Win-first").style[this.changeDomProp] = this.firstSize + this.offset + "px";
                        console.log("drag", this.startP, this.offset, this.firstSize + this.offset);
                    }
                }}
                onDragEnd={e => {
                    e.persist();
                    this.firstSize = this.firstSize + e[this.clientDirection] - this.startP;
                    if (this.firstSize < 0)
                        this.firstSize = 0;
                    else if (this.firstSize > document.getElementById("drag-Win").style[this.changeDomProp])
                        this.firstSize = document.getElementById("drag-Win").style[this.changeDomProp];
                    document.getElementById("drag-Win-first").style[this.changeDomProp] = this.firstSize + "px";
                    console.log("end", this.firstSize);
                }}
            />
            <div style={{ flex: 1 }}> {secondChild} </div>
        </div>
    }
}
export default DragWin;