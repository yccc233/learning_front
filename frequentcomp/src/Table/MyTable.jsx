
import {Table} from "antd";
import {useEffect, useState} from "react";
import React from "react";

const $ = require("jquery");

function MyTable() {
    
    const [dataSource, setDataSource] = useState([]);
    
    const columns = [
        {
            title: '序号',
            dataIndex: "key"
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '自我描述',
            dataIndex: 'intro',
            key: "intro"
        },
    ];
    
    useEffect(() => {
        console.log("this is useEffect")
        $.get("http://127.0.0.1:3005/filestream/getFile").then(res => {
            console.log(res)
            setDataSource([])
        });
    }, []);
    
    console.log("here!!!")
    return <>
        <Table dataSource={dataSource} columns={columns}/>
    </>
}

export default MyTable;

