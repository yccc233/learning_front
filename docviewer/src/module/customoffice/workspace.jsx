import React, { Component } from 'react';
import Docx from './word/docx';
import Doc from './word/doc';
import Excel from './xlsx';
import Text from './text';
import ErrorHappened from "../errorboundary";
import "../../css/workspace.css";
import Pdf from './pdf';
import { Empty } from "antd";

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            fileType: "",
            fileStream: ""
        };

        this.analyse = this.analyse.bind(this);
    }

    componentDidMount() {
        document.title = "文档预览";
    }

    analyse() {

        const file = document.getElementById('input_file2').files[0];
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        const that = this;
        fileReader.onload = function () {
            console.log(this, file);
            const [name, type] = file.name.split(".");
            that.setState({
                fileName: name,
                fileType: type,
                fileStream: this.result
            });
        }
    }

    render() {
        const { fileType, fileStream } = this.state;
        let docCom = null;
        console.log(this.state);

        switch (fileType) {
            case "docx":
                docCom = <Docx fileStream={fileStream} type="docx" />;
                break;
            case "doc":
                docCom = <Doc fileStream={fileStream} type="doc" />;
                break;
            case "xlsx":
                docCom = <Excel fileStream={fileStream} type="xlsx" />;
                break;
            case "txt":
                docCom = <Text fileStream={fileStream} type="text" />;
                break;
            case "pdf":
                docCom = <Pdf />;
                break;
            default:
                docCom = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }

        return <ErrorHappened>
            <div className='headline'>
                <input id="input_file2" type="file" name="ycc" />
                <button onClick={this.analyse}>上传</button>
            </div>
            <div className='showfile'>
                {docCom}
            </div>
        </ErrorHappened>;
    }
}

export default (Workspace);