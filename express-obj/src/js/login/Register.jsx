import {Button, Form, Input, Radio, Space, Select, Tooltip} from "antd";
import {Redirect} from "react-router-dom";
import React, {useState} from "react";
import '../../css/register.css';
import Notify from "../notify";
const $ = require("jquery");
const {Item, useForm} = Form;
const {Option} = Select;

function Register() {
    const [isRedirect, setRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();
    
    const onSubmit = (params) => {
        console.log(params);
        setIsLoading(true);
        $.post("http://localhost:3005/login/register", params).done(res => {
            console.log(res)
            res = JSON.parse(res)
            setIsLoading(false);
            if (res.code === 0) {
                res = res.data;
                switch (res.type) {
                    case 1:
                        Notify("warning", "账户已存在，换个名字吧！");
                        break;
                    case 2:
                        Notify("error", "数据库错误！");
                        break
                    default:
                        Notify("success", "恭喜！注册成功！");
                        setRedirect(true);
                }
            } else {
                Notify("error", res.message);
            }
        });
    }
    
    return <>
        {
            isRedirect ?
                <Redirect to={"/login"}/>
                :
                <Space align={"center"} className={"register-box"}>
                    <div>
                        <h2>注册账户！</h2>
                        <p>请根据提示完成个人身份登记</p>
                        <div>
                            <Form
                                onFinish={onSubmit}
                                form={form}
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: '邮箱格式不对！',
                                        },
                                        {
                                            required: true,
                                            message: '邮箱信息必须要！',
                                        },
                                    ]}
                                >
                                    <Input placeholder={"//输入你的邮箱..."}/>
                                </Item>
                                <Item
                                    name="account"
                                    label="账号"
                                    rules={[{
                                        required: true,
                                        message: '账号必须要！',
                                    }]}
                                >
                                    <Input placeholder={"//输入你要登陆的账号..."}/>
                                </Item>
                                <Item
                                    name="password"
                                    label="密码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码必须要',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password placeholder={"//输入你的密码..."}/>
                                </Item>
                                <Item
                                    name="confirm"
                                    label="再次确认密码"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '请再次输入你的密码！',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('输入的两次密码不匹配！'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder={"//请再次输入你的密码..."}/>
                                </Item>
                                <Item
                                    name="name"
                                    label="姓名"
                                    rules={[{
                                        required: true,
                                        message: '请务必写上！',
                                    }]}
                                >
                                    <Input placeholder={"//请输入你的真实姓名"} />
                                </Item>
                                <Item
                                    name="gender"
                                    label="性别"
                                >
                                    <Select placeholder="//选择你的性别...">
                                        <Option value="male">男</Option>
                                        <Option value="female">女</Option>
                                        <Option value="other">不告诉你</Option>
                                    </Select>
                                </Item>
                                <Item
                                    label={"出生年月"}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Item
                                        name={"year"}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                    >
                                        <Input placeholder="//年份..." />
                                    </Item>
                                    <Item
                                        name={"month"}
                                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                    >
                                        <Input placeholder="//月份..." />
                                    </Item>
                                </Item>
                                <Item
                                    name="phone"
                                    label="手机号"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请务必输入你的手机号!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder={"//输入你的手机号"}
                                    />
                                </Item>
                                <Item
                                    name="address"
                                    label="家庭住址"
                                >
                                    <Input placeholder={"//请输入你的常用地址..."}/>
                                </Item>
                                <Tooltip title={"只有收件人可以在线注册！其他人员请联系管理员！"}>
                                    <Radio.Group disabled={true} value={0} style={{marginBottom: "10px"}}>
                                        <Radio value={0}>收件人</Radio>
                                        <Radio value={1}>快递员</Radio>
                                        <Radio value={2}>工作人员</Radio>
                                        <Radio value={3}>管理员</Radio>
                                    </Radio.Group>
                                </Tooltip>
                                <Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16
                                    }}
                                >
                                    <Button type={"primary"} htmlType={"submit"} loading={isLoading}>注册</Button>
                                </Item>
                            </Form>
                        </div>
                    </div>
                </Space>
        }
    </>
}

export default Register;