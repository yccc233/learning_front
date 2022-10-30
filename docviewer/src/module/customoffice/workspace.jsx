import React, { Component } from 'react';
import Word from './cword';
import Excel from './xlsx';
import Text from './text';
import ErrorHappened from "../errorboundary";
import "../../css/workspace.css";
import $ from "jquery";

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upoadFile: false,
            showFile: false,
            fileData: null
        }
        this.args = { fileId: "123456", fileType: "txt", fileName: "测试" };
        this.componentType = this.args.fileType;

        this.analyse = this.analyse.bind(this);
        this.showFile = this.showFile.bind(this);
    }

    componentDidMount() {
        document.title = this.args.fileName ? this.args.fileName : "文档预览";
    }

    analyse() {
        this.setState({ upoadFile: true, showFile: false });

        const file = document.getElementById('input_file2').files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            var form = new FormData();
            form.append("fileType", file.type);
            form.append("fileName", file.name);
            form.append("fileStream", e.target.result);
            $.ajax({
                type: 'POST',
                url: "http://127.0.0.1:8080/files/upload",
                data: form,
                cache: false,
                processData: false,
                contentType: false,
                success: function (res) {
                    res = JSON.parse(res);
                    if (res.code === 0) {
                    } else {
                        console.error(res.msg);
                    }
                },
                error: function (errMsg) {
                    console.error("上传失败：", errMsg);
                }
            });
        }
        fileReader.readAsArrayBuffer(file);
    }

    showFile() {
        $.post("http://127.0.0.1:8080/files/download", {}).done(res => {
            res = JSON.parse(res)
            if (res.code === 0) {
                var data = new Blob([res.data.fileStream], { type: res.data.fileType });
                this.setState({
                    upoadFile: false,
                    showFile: true,
                    fileData: res.data
                });
            } else {
                console.error("下载失败：", res.msg);
            }
        });
    }

    render() {
        const { showFile, fileData } = this.state;
        let docCom = null;
        if (this.componentType == "word") {
            docCom = <Word fileStream={fileData && fileData.fileStream} type={"docx"} />;
        }
        if (this.componentType == "xlsx") {
            docCom = <Excel fileStream={fileData && fileData.fileStream} type="xlsx" />;
        }
        if (this.componentType == "txt") {
            docCom = <Text fileStream={fileData && fileData.fileStream} type="text" />;
        }
        return <ErrorHappened>
            <div className='headline'>
                <input id="input_file2" type="file" name="ycc" />
                <button onClick={this.analyse}>上传</button>
                <button onClick={this.showFile}>预览</button>
            </div>
            <div className='showfile'>
                {showFile && docCom}
            </div>
        </ErrorHappened>;
    }
}

export default (Workspace);