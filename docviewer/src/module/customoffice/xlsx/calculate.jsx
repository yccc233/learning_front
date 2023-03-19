import * as XLSX from "xlsx";

export const getData = (sheet) => {
    const data = XLSX.utils.sheet_to_json(sheet, {header: 1});
    let max = 0;
    // 前几行会被丢弃，但是基于merge，不能丢弃
    const firsts_empty_line = sheet['!ref'] ? sheet['!ref'].match(/\d+/)["0"] - 1 : 0;
    data.forEach(line => line.length > max ? (max = line.length) : null);
    data.forEach(line => line.length = max);
    return Array.from({length: firsts_empty_line}).map(() => Array.from({length: max}))
        .concat(data.map(line => Array.from(line, cell => cell === undefined ? '' : cell)));
};

export const getColumns = (workbook, sheetName) => {
    let max = 0;
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {header: 1});
    data.forEach(line => line.length > max ? (max = line.length) : null);
    return Array.from({length: max}).map(() => ({
        width: undefined,
        className: "",
        renderer: "styleRender"
    }));
};

export const getCells = (workbook, sheetName) => {
    console.log(workbook, sheetName)
};