import React, {Component} from 'react';
import Doc from './word/doc';
import ErrorHappened from "../errorboundary";
import {Divider, Empty, Result, Button} from "antd";

class Workspace extends Component {
    constructor(props) {
        super(props);
        let name = '', type = '', stream = '';
        const session = sessionStorage.getItem("fileInfo");
        if (session) {
            let sessionFormat;
            try {
                sessionFormat = JSON.parse(session);
            } catch (e) {
                console.error(e);
                sessionFormat = {};
            }
            name = sessionFormat.fileName;
            type = sessionFormat.fileType;
            stream = sessionFormat.fileStream;
        }
        this.state = {
            fileName: name || '',
            fileType: type || '',
            fileStream: stream || ''
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
            const splits = file.name.split('.');
            const name = splits.slice(0, splits.length - 1).join('.');
            const type = splits[splits.length - 1];
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
        const type = fileType.toLowerCase();
        switch (type) {
            case "doc":
                docCom = <Doc fileStream={fileStream} type={type}/>;
                break;
            default:
                docCom = <EmptyWay fileStream={fileStream} type={type}/>;
        }

        return <ErrorHappened>
            <div style={{height: 25}}>
                <input id="input_file2" type="file" name="ycc" onChange={this.analyse}/>
                <button onClick={this.analyse} style={{display: "none"}}>上传</button>
            </div>
            <Divider style={{margin: 5}}/>
            <div className='flex1'>
                {docCom}
            </div>
        </ErrorHappened>;
    }
}

// 无预览方法的组件
const EmptyWay = (props) => {
    return <Result
        className="custom-empty"
        status="error"
        title={props.fileStream ? `${props.type}文件无法在线预览` : "请上传文件"}
    />;
};
export default (Workspace);
