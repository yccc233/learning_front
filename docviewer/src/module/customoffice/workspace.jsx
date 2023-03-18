import React, {Component} from 'react';
import Docx from './word/docx';
import Doc from './word/doc';
import Excel from './xlsx';
import Text from './text';
import ErrorHappened from "../errorboundary";
import "../../style/customoffice.less";
import Pdf from './pdf';
import {Divider, Empty} from "antd";

class Workspace extends Component {
    constructor(props) {
        super(props);
        let name = '', type = '', stream = '';

        const session = sessionStorage.getItem("fileInfo");
        if (session) {
            const sessionFormat = JSON.parse(session);
            name = sessionFormat.fileName;
            type = sessionFormat.fileType;
            stream = sessionFormat.fileStream;
        }

        this.state = {
            fileName: name,
            fileType: type,
            fileStream: stream
        };

        this.analyse = this.analyse.bind(this);
    }

    componentDidMount() {
        document.title = this.state.fileName ? this.state.fileName + "." + this.state.fileType : "文档预览";
    }

    componentDidUpdate() {
        document.title = this.state.fileName + "." + this.state.fileType;
    }

    analyse() {
        const file = document.getElementById('input_file2').files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        const that = this;
        fileReader.onload = function () {
            const [name, type] = file.name.split(".");
            const result = this.result.slice(this.result.indexOf(',') + 1);
            that.setState({
                fileName: name,
                fileType: type,
                fileStream: result
            });
            sessionStorage.setItem("fileInfo", JSON.stringify({
                fileName: name,
                fileType: type,
                fileStream: result
            }));
        }
    }

    render() {
        const {fileType, fileStream} = this.state;
        let docCom = null;
        switch (fileType.toLowerCase()) {
            case "docx":
                docCom = <Docx fileStream={fileStream} type="docx"/>;
                break;
            case "doc":
                docCom = <Doc fileStream={fileStream} type="doc"/>;
                break;
            case "xlsx":
            case "xls":
                docCom = <Excel fileStream={fileStream} type="xlsx"/>;
                break;
            case "txt":
                docCom = <Text fileStream={fileStream} type="text"/>;
                break;
            case "pdf":
                docCom = <Pdf fileStream={fileStream} type="pdf"/>;
                break;
            default:
                docCom = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>;
        }

        return <ErrorHappened>
            <div className='headline'>
                <input id="input_file2" type="file" name="ycc"/>
                <button onClick={this.analyse}>上传</button>
            </div>
            <Divider style={{margin: 5}}/>
            <div className='showfile'>
                {docCom}
            </div>
        </ErrorHappened>;
    }
}

export default (Workspace);
