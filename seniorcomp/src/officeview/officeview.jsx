import React from "react";
import "./office.css";
import {Select, Input, Button, Form, Modal} from "antd";
import FileViewer from "react-file-viewer-plugins-v3";

const {Component, Fragment, createRef} = React;
const {Option} = Select;
const {Item} = Form;

export default class OfficeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSee: false,
            files: ['pdf', 'doc', 'docx', 'xls']
        };
        this.formRef = createRef();
    }

    inputChange = e => {
        let v = e.target.value;
        let fileType = v.split('.')[v.split('.').length - 1];
        this.state.files.includes(fileType) && this.formRef.current.setFieldsValue({fileType});
    }

    render() {
        return <Fragment>
            <div>
                <Form ref={this.formRef}>
                    <Item name={["fileSource"]} initialValue={"http://ycc.com/files/"}>
                        <Input placeholder={"文件路径"} onChange={this.inputChange} style={{width: 500}}/>
                    </Item>
                    <Item name={["fileType"]}>
                        <Select placeholder={"选择文件类型！"} onChange={v => this.setState({fileType: v})} style={{width: 400}}>
                            {this.state.files.map(ft => (
                                <Option value={ft} key={ft}>{ft}</Option>
                            ))}
                        </Select>
                    </Item>
                </Form>
                {/*<Button type={"primary"} onClick={() => console.log(this.state)}>See</Button>*/}
                <Button type={"primary"} onClick={() => this.setState({isSee: true})}>See</Button>
            </div>
            {
                this.state.isSee
                && <FileView
                    isvisible={this.state.isSee}
                    fileType={this.formRef.current.getFieldsValue().fileType}
                    fileSource={this.formRef.current.getFieldsValue().fileSource}
                    onCancel={() => this.setState({isSee: false})}
                />
            }
        </Fragment>
    }
}


class FileView extends Component {
    constructor(props) {
        super(props);
        this.state={};
        console.log("文件参数", props)
    }

    render() {
        const {isvisible, fileType, fileSource, onCancel} = this.props;
        return (
            <Modal
                visible={isvisible}
                title={`${fileType}文件`}
                footer={null}
                onCancel={onCancel}
                width={"80%"}
            >
               {/* 对于pdf有一个默认的工具 */}
               {/*<iframe src={fileSource} style={{width: "100%", height: 600}}></iframe>*/}
                <FileViewer
                    crossOrigin={"anonymous"}
                    fileType={fileType}
                    filePath={fileSource}
                    errorComponent={<h1>有些小问题</h1>}
                    onError={err => console.log("something is wrong：", err)}/>
            </Modal>
        );
    }
}
