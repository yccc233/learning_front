
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from "react-cookies";
import '../../css/login.css';
import { Link, Redirect } from "react-router-dom";
import Notify from "../notify";

const { Item, useForm } = Form;
const $ = require("jquery");

function Login(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    const onSubmit = (params) => {
        setIsLoading(true);
        setTimeout(() => {
            $.post("http://localhost:3005/login/verify", {
                account: params.account,
                password: params.password,
                role: params.role
            }).done(res => {
                res = JSON.parse(res);
                if (res.code === 0) {
                    res = res.data;
                    switch (res.type) {
                        case 0:
                            let oneMinute = new Date(new Date().getTime() + 1 * 60 * 1000);
                            cookie.save('userid', res.userid, { expires: oneMinute });
                            setIsLogin(true);
                            break;
                        case 1:
                            Notify("warning", "账户或密码或角色错误！");
                            break
                        case 2:
                            Notify("warning", "用户不存在");
                            break;
                        default:
                            console.log("找不到type！")
                    }
                    form.setFieldsValue({
                        password: ""
                    });
                } else {
                    Notify("error", "接口错误！");
                }
                setIsLoading(false);
            });
        }, 1000)
    };


    useEffect(() => {

        let randonStr = '';

        const str = "1234567890poiuytrewqasdfghjklmnbvcxzQWERTYUIOPLKJHGFDSAZXCVBNM";

        for (var i = 0; i < 1000000; i++) {
            randonStr += str[Math.floor(Math.random() * str.length)];
        }

        console.log(randonStr);

        $.ajax({
            url: 'http://localhost:2999/test/postWay',
            type: 'POST',
            data: { length: randonStr.length, randonStr: randonStr },
            // dataType: 'json',
            timeout: 30000,
            success: () => {
                console.log("success");
            },
            error: () => {
                console.log("error");

            }
        });
    }, []);

    return <>
        {
            isLogin ? <Redirect to={"/homepage"} /> :
                <div className={"box-body"}>
                    <div className={"box-content"}>
                        <h2 className={"title"}>欢迎登录</h2>
                        <div className={"form-box"}>
                            <Form
                                layout={"vertical"}
                                onFinish={onSubmit}
                                form={form}
                            >
                                <Item
                                    label={"账户"}
                                    name={"account"}
                                    tooltip={"输入你的账户，长度不得超过十位"}
                                    rules={[{
                                        required: true,
                                        message: "输入你的账户"
                                    }]}
                                >
                                    <Input placeholder={"//输入账户..."} prefix={<UserOutlined />} />
                                </Item>
                                <Item
                                    label={"密码"}
                                    name={"password"}
                                    tooltip={"输入你的密码"}
                                    rules={[{
                                        required: true,
                                        message: "输入你的密码"
                                    }]}
                                >
                                    <Input.Password placeholder={"//输入密码..."} prefix={<LockOutlined />} />
                                </Item>
                                <Item
                                    name={"role"}
                                    initialValue={0}
                                >
                                    <Radio.Group>
                                        <Radio value={0}>收件人</Radio>
                                        <Radio value={1}>快递员</Radio>
                                        <Radio value={2}>工作人员</Radio>
                                        <Radio value={3}>管理员</Radio>
                                    </Radio.Group>
                                </Item>
                                <Item
                                    wrapperCol={{
                                        offset: 5,
                                        span: 16
                                    }}
                                >
                                    <Button type={"primary"} htmlType={"submit"} loading={isLoading}>登录</Button>
                                    <span style={{ marginLeft: "10px" }}>还没账户呢 <Link to={"/register"} style={{ textDecoration: "underline" }}>立即注册</Link></span>
                                </Item>
                            </Form>
                        </div>
                    </div>
                </div>
        }
    </>
}

export default Login;