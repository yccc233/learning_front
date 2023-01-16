import React, { Component } from 'react';
import $ from "jquery";
import { Document, Page } from "react-pdf";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf";

// 设置pdf.worker.js文件的引入地址
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry");

function Base64toBlob(str) {
    const bstr = atob(str);
    var n = bstr.length;
    const nBrr = new Uint8Array(n);
    while (n--) nBrr[n] = bstr.charCodeAt(n);
    return new Blob([nBrr], { type: 'application/pdf' });
}

class Pdf extends Component {
    state = {
        pdfUrl: null,
        pdfBlob: null,

        numPages: null,
        pageNumber: 1,
    }

    first = false;

    componentDidMount() {
        if (this.first == true) return;
        this.first = true;


        $.get("http://127.0.0.1:8080/bin/readStream").then(data => {
            var blob = Base64toBlob(data);
            // data是一个ArrayBuffer格式，也是一个buffer流的数据
            PDFJS.getDocument(window.URL.createObjectURL(blob)).promise.then(pdfDoc => {
                console.log(pdfDoc);
                window.pdfDoc = pdfDoc
                const numPages = pdfDoc.numPages; // pdf的总页数
                // 获取第1页的数据
                pdfDoc.getPage(1).then(page => {
                    // 设置canvas相关的属性
                    const canvas = document.getElementById("pdf-viewer");
                    const ctx = canvas.getContext("2d");
                    const dpr = window.devicePixelRatio || 1;
                    const bsr =
                        ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio ||
                        1;
                    const ratio = dpr / bsr;
                    const viewport = page.getViewport({ scale: 1 });
                    canvas.width = viewport.width * ratio;
                    canvas.height = viewport.height * ratio;
                    canvas.style.width = viewport.width + "px";
                    canvas.style.height = viewport.height + "px";
                    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                    const renderContext = {
                        canvasContext: ctx,
                        viewport: viewport,
                    };
                    // 数据渲染到canvas画布上
                    page.render(renderContext);
                })
            })


            // this.setState({
            //     pdfUrl: window.URL.createObjectURL(blob),
            //     pdfBlob: blob
            // });
        })
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { pdfUrl, pdfBlob, pageNumber, numPages } = this.state;
        console.log('args===', pdfUrl, pageNumber, numPages);
        return <div>

            <canvas id="pdf-viewer" style={{ width: "100%", height: 600 }} />

            {/* <Document
                file={pdfBlob}
                onLoadSuccess={this.onDocumentLoad}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>

            <iframe src={this.state.pdfUrl} style={{ width: "100%", height: 700 }}></iframe> */}
        </div>
    }
}

export default Pdf;