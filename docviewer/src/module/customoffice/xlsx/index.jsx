import React, { Component } from 'react';
import ExcelJS from "exceljs";
import Handsontable from 'handsontable';
import { registerLanguageDictionary, zhCN } from "handsontable/i18n";
import 'handsontable/dist/handsontable.full.min.css';

// 注册中文
registerLanguageDictionary(zhCN);


class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sheet: null,
            sheetConfig: null
        }
        this.hasrender = 0;

        this.hot = null;
        this.workbook = null;
        this.ws = null;

        this.getData = this.getData.bind(this)
        this.getCell = this.getCell.bind(this)
        this.getMerge = this.getMerge.bind(this)
    }

    fixMatrix(data, colLen) {
        for (const row of data) {
            for (let j = 0; j < colLen; j++) {
                if (!row[j]) {
                    row[j] = '';
                }
            }
        }
        return data;
    }

    alignToClass({ horizontal, vertical }) {
        return [horizontal, vertical]
            .filter((i) => i)
            .map((key) => `ht${key.charAt(0).toUpperCase()}${key.slice(1)}`)
            .join(" ");
    }

    getData() {
        return this.fixMatrix(this.ws.getRows(1, this.ws.actualRowCount).map((row) =>
            row._cells.map((item) => {
                const value = item.model.value;
                if (value) {
                    return value.richText ? value.richText.text : value;
                }
                return "";
            })
        ),
            this.ws.columns.map((item) => item.letter).length
        )
    }

    getCell() {
        return this.ws.getRows(1, this.ws.actualRowCount).flatMap((row, ri) => {
            return row._cells
                .map((cell, ci) => {
                    if (cell.style) {
                        return {
                            row: ri,
                            col: ci,
                            ...(cell.alignment
                                ? { className: this.alignToClass(cell.alignment) }
                                : {}),
                            style: cell.style,
                        };
                    }
                })
                .filter((i) => i);
        })
    }


    getMerge() {
        return Object.values(this.ws._merges).map(({ left, top, right, bottom }) => {
            // 构建区域
            return {
                row: top - 1,
                col: left - 1,
                rowspan: bottom - top + 1,
                colspan: right - left + 1,
            };
        })
    }
    componentDidMount() {
        if (this.hasrender) return;
        this.hasrender = 1
        const file = document.getElementById('input_file2').files[0];
        let fileReader = new FileReader();
        const that = this;
        fileReader.onload = function (e) {
            new ExcelJS.Workbook().xlsx.load(e.target.result).then(workbook => {
                window.workbook = workbook;
                that.workbook = workbook;

                that.ws = workbook.getWorksheet(1);
                
                // 计算data
                const data = that.getData();

                // 计算cell
                const cell = that.getCell();

                // 计算merge
                const merge = that.getMerge();

                console.log("data", that.ws, data);
                const container = document.getElementById('custom-excel');
                that.hot = new Handsontable(container, {
                    language: "zh-CN",
                    readOnly: true,
                    data: data,
                    cell: cell,
                    mergeCells: merge,
                    colHeaders: true,
                    rowHeaders: true,
                    height: "calc(100vh - 107px)",
                    // 关闭外部点击取消选中时间的行为
                    outsideClickDeselects: false,
                    licenseKey: "non-commercial-and-evaluation",
                });
                that.setState({
                    sheetConfig: workbook._worksheets.filter(ws => ws)
                });
            }).catch(e => console.error(e))
        }
        fileReader.readAsArrayBuffer(file);
    }

    changeSheet(id, name) {
        console.log("change", this.hot);
        this.ws = this.workbook.getWorksheet(id);
        this.hot.updateSettings({
            data: this.getData(),
            cell: this.getCell(),
            mergeCells: this.getMerge(),
        });
    }

    render() {
        const { sheetConfig } = this.state;
        return <React.Fragment>
            <div id="custom-excel"></div>
            <div>
                {sheetConfig && sheetConfig.map(sheet => (
                    <button key={sheet.name + sheet.id} onClick={() => this.changeSheet(sheet.id, sheet.name)}>{sheet.name}</button>
                ))}
            </div>
        </React.Fragment>
    }
}

export default Excel;