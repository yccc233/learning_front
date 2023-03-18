import React, { Component } from 'react';
import ErrorHappened from "../errorboundary";
import "../../style/workspace.css";
import { Divider, Empty } from "antd";

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
        document.title = this.state.fileName + "." + this.state.fileType;
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
            console.log(this.result);
            that.setState({
                fileName: name,
                fileType: type,
                fileStream: this.result
            });

            sessionStorage.setItem("fileInfo", JSON.stringify({
                fileName: name,
                fileType: type,
                fileStream: this.result
            }));
        }
    }

    render() {
        return <ErrorHappened>
          <div>no thing now!</div>
        </ErrorHappened>;
    }
}

export default (Workspace);