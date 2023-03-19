import React, { Component } from 'react';
import { base64toBlob } from "../../utils";
var $ = require("jquery");

/**
 * @param {*} fileStream
 * @param {*} type
 */
class Word extends Component {

    displayResult(result) {
        let html = result.value;
        let newHTML = html.replace(/<h1>/g, '<h1 style="text-align: center; font-size: 16px;">')
            .replace(/<table>/g, '<table style="border-collapse: collapse;">')
            .replace(/<tr>/g, '<tr style="height: 30px;">')
            .replace(/<td>/g, '<td style="border: 1px solid #000;min-width: 10px;">')
            .replace(/<p>/g, '<p style="text-indent: 2em;">');
        document.getElementById("custom-word").innerHTML = newHTML;
    }

    componentDidMount() {
        if (this.props.fileStream) {
            if (this.props.type.toLowerCase() === 'doc') {
                $.post('http://localhost:8080/transfer/getPDFfile', { fileStream: this.props.fileStream, fileType: this.props.type })
                    .then(res => {
                        if (res.code == 0) {
                            this.preview(res.data);
                        }
                    })

            } else {
                this.preview(this.props.fileStream);
            }

        } else {
            document.getElementById("custom-word-loading").innerText = "没有预览或下载方式地址";
        }
    }

    preview(fileStream) {
        const data = base64toBlob(fileStream);
        // 判断docx是否可用
        if (window.docx) {
            var option = require("docx-preview").defaultOptions;
            var docx = require("docx-preview/dist/docx-preview");
            docx.renderAsync(data, document.getElementById("custom-word"), null, option)
                .then(() => {
                });
        } else {
            window.mammoth.convertToHtml({
                arrayBuffer: data
            })
                .then(this.displayResult)
                .done(() => {
                    document.getElementById("custom-word").classList.add("mammoth-word");
                });
        }
    }

    render() {
        return <div id="custom-word">
            <h2 id="custom-word-loading" style={{ margin: 20 }}>数据正在加载中，请稍后...</h2>
        </div>;
    }
}


export default Word;