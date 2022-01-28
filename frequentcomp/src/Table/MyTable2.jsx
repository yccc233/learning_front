/**
 * 表格内添加数据，点击添加在表格内一行展示添加内容以及编辑保存等
 */

import React from "react";
// eslint-disable-next-line
const $ = require("jquery");

export default class MyTable2 extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.columns = [
    //         {
    //             title: '序号',
    //             dataIndex: "key"
    //         },
    //         {
    //             title: '姓名',
    //             dataIndex: 'name',
    //             key: 'name'
    //         },
    //         {
    //             title: '性别',
    //             dataIndex: 'gender',
    //             key: 'gender'
    //         },
    //         {
    //             title: '年龄',
    //             dataIndex: 'age',
    //             key: 'age',
    //         },
    //         {
    //             title: '邮箱',
    //             dataIndex: 'email',
    //             key: 'email',
    //         },
    //         {
    //             title: '自我描述',
    //             dataIndex: 'intro',
    //             key: "intro"
    //         },
    //     ];
    //     this.state = {
    //         dataSource: []
    //     }
    // }

    // componentDidMount() {
    //     $.get("http://127.0.0.1:3005/filestream/getFile").then(res => {
    //         console.log(res)
    //         // this.setState()
    //     });
    // }

    render() {
        return (
            <>
                {/*<Table columuns={this.columns} dataSource={this.state.dataSource}/>*/}
                <span>hello</span>
            </>
        );
    }
}
