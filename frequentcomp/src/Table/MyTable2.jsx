/**
 * 表格内添加数据，点击添加在表格内一行展示添加内容以及编辑保存等
 */

import React, {useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, Table} from "antd";



export default function  MyTable2 () {

    const [dataSource, setDataSource] = useState([]);
    const [editedKey, setEdited] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            editable: true
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            editable: true
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            editable: true
        },
        {
            title: '操作',
            dataIndex: 'operate',
            align: 'center',
            render: (text, record) => {
                return editedKey && editedKey === record.key ? (<div>
                        <Button type={"link"} onClick={() => {
                            console.log("表单数据", form.getFieldsValue())
                            setEdited(null)

                            setDataSource(dataSource.map(data => {
                                if (data.key === record.key) return Object.assign(data, form.getFieldsValue())
                                else return data;
                            }))
                        }}>保存</Button>
                        <Button type={"link"} onClick={() => {
                            setEdited(null)
                            //不用改，取消或新增后调取后端服务刷新表格，不会造成脏数据
                        }}>取消</Button>
                    </div>) : (<div>
                        <Button type={"link"} disabled={!!editedKey} onClick={() => {
                            setEdited(record.key)
                        }}>编辑</Button>
                        <Button type={"link"} disabled={!!editedKey} onClick={() => {
                            setDataSource(dataSource.map(data => data.key === record.key ))
                        }}>删除</Button>
                    </div>)
            }
        }
    ];



    useEffect(() => {
        setDataSource([
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园4号',
            },
            {
                key: '3',
                name: '胡歌',
                age: 43,
                address: '西湖区湖底公园2号',
            }
        ])
    }, [])

    const mColumns = columns.map(col => {
        if (! col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: editedKey === record.key
            })
        }
    })

    return (
        <div style={{margin: 50}}>
            <Form form={form} component={false}>
                <Button type={"primary"} disabled={!!editedKey} onClick={() => {
                    const key = "" + dataSource.length+1;
                    setDataSource([{key: key, name: '',age: 0, address: ''}, ...dataSource])
                    setEdited(key)
                }}>新增成员</Button>
                <Table
                    components={{
                        body: {
                            cell: (props) => {
                                const {
                                    editing,
                                    dataIndex,
                                    title,
                                    inputType,
                                    record,
                                    index,
                                    children,
                                    ...restProps
                                } = props;
                                const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
                                if (editing) form.setFieldsValue(record);
                                return (
                                    <td {...restProps}>
                                        {editing ? (
                                            <Form.Item
                                                name={dataIndex}
                                                style={{
                                                    margin: 0,
                                                }}
                                                va={dataIndex && record[dataIndex]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `请输入 ${title} !`,
                                                    },
                                                ]}
                                            >
                                                {inputNode}
                                            </Form.Item>
                                        ) : (
                                            children
                                        )}
                                    </td>
                                );
                            },
                        },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mColumns}
                    // rowClassName="editable-row"
                />
            </Form>
        </div>
    );
}

