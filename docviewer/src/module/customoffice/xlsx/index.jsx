import * as XLSX from "xlsx";
import React, {Component} from "react";
import {base64toArrayBuffer, transformStream} from "../../utils";
import Handsontable from "handsontable";
import {getData, getColumns, getCells} from "./calculate";
import 'handsontable/dist/handsontable.full.css';

import {registerLanguageDictionary, zhCN} from "handsontable/i18n";
import {registerAllModules} from "handsontable/registry";
registerLanguageDictionary(zhCN);
registerAllModules();


class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workbook: null,
            sheetNames: [],
            sheetName: null,

            height: null,
            width: null
        };
        this.hot = null;
        this.reRender = this.reRender.bind(this);
    }

    componentDidMount() {
        const that = this;
        const dom = document.getElementsByClassName("excel-container")[0];
        const width = dom.offsetWidth, height = dom.offsetHeight;

        window.addEventListener("resize", () => {
            const dom = document.getElementsByClassName("excel-container")[0];
            that.setState({
                width: dom.offsetWidth,
                height: dom.offsetHeight
            });
        });

        if (that.props.fileStream) {
            that.registerRenderer();

            if(that.props.type === 'csv'){
                const csvd = transformStream(that.props.fileStream, 'utf8');
                const workbook = XLSX.read(csvd, {type: 'binary'});
                that.setState({
                    workbook: workbook,
                    sheetNames: workbook.SheetNames,
                    sheetName: workbook.SheetNames[0],
                    width: width,
                    height: height
                }, that.reRender);
            }else {
                //读取excel
                const workbook = XLSX.read(that.props.fileStream, {type: 'base64'});
                that.setState({
                    workbook: workbook,
                    sheetNames: workbook.SheetNames,
                    sheetName: workbook.SheetNames[0],
                    width: width,
                    height: height
                }, that.reRender);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.width !== this.state.width || prevState.height !== this.state.height) {
            this.hot?.updateSettings({
                width: this.state.width,
                height: this.state.height
            });
        }

        if (prevState.sheetName!==this.state.sheetName){
            this.reRender();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => console.info("cancel resize in excel"));
    }

    getHotMergedCells(sheetName) {
        if (this.state.workbook) {
            var sheet = this.state.workbook.Sheets[sheetName];
            var result = [];
            var rawArr = sheet['!merges'];
            for (var i in rawArr) {
                var obj = rawArr[i];
                var colspan = obj.e.c - obj.s.c + 1;
                var rowspan = obj.e.r - obj.s.r + 1;
                var handledObj = {
                    row: obj.s.r,
                    col: obj.s.c,
                    rowspan: rowspan,
                    colspan: colspan
                }
                result.push(handledObj);
            }
            return result;
        }
    }

    reRender() {
        const sheetArr = getData(this.state.workbook.Sheets[this.state.sheetName]);
        const columns = getColumns(this.state.workbook, this.state.sheetName);
        const options = {
            language: "zh-CN",
            data: sheetArr,
            mergeCells: this.getHotMergedCells(this.state.sheetName),
            columns: columns,
            readOnly: true,
            outsideClickDeselects: true,
            rowHeaders: true,
            colHeaders: true,
            width: this.state.width,
            height: this.state.height,
            // filters: true,
            dropdownMenu: true,
            // contextMenu: true,
            manualColumnMove: true,
            manualRowMove: true,
            // autoColumnSize: true,
            manualColumnResize: true,
            manualRowResize: true,
            licenseKey: "non-commercial-and-evaluation",
        };
        if (this.hot) {
            this.hot.updateSettings(options);
        } else {
            const container = document.getElementById('custom-excel');
            this.hot = new Handsontable(container, options);
        }
    }

    registerRenderer() {
        // 注册自定义渲染
        const _borders = ["left", "right", "top", "bottom"];
        Handsontable.renderers.registerRenderer("styleRender", (hotInstance, TD, row, col, prop, value, cell) => {
            Handsontable.renderers.getRenderer("text")(hotInstance, TD, row, col, prop, value, cell);
        });
    }


    render() {
        const {sheetNames, sheetName} = this.state;
        return (
            <div className={"excel full"}>
                <div className={"excel-container"}>
                    <div id={"custom-excel"}/>
                </div>
                <div className="excel-sheets">
                    {sheetNames.map((st, ind) => (
                        <button key={st + ind} className={sheetName === st ? "checked" : null}
                                onClick={() => this.setState({sheetName: st})}>
                            {st}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default Excel;