
import {Button, Form, Input, InputNumber, notification, Radio} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Link} from "react-router-dom";
import "./myform.css";

const $ = require("jquery");

function MyForm() {

    const onFinish = (values) => {
        console.log(values)
        $.post("http://127.0.0.1:3005/filestream/writeFile", {data: JSON.stringify(values)}).then(res => {
            res = JSON.parse(res)
            if (res.code === 0) {
                notification["success"]({
                    message: "成功啦！"
                });
            } else {
                notification["error"]({
                    message: "有个问题！",
                    description: res.message
                });
            }
        }).catch(reason => {
            notification["error"]({
                message: "没有这个服务啊！"
            })
        });
    }

    const Item = Form.Item;

    const layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 16
        }
    };

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label}必须要有！',
        number: {
            // eslint-disable-next-line no-template-curly-in-string
            range: '${label}在${min}~${max}之间！'
        },
        types: {
            // eslint-disable-next-line no-template-curly-in-string
            number: '${label}不合要求！',
            // eslint-disable-next-line no-template-curly-in-string
            email: '${label}不合要求！'
        }
    }

    return <>
        <div style={{padding: "50px 500px"}}>
            <span className={"back-link"}>
                <Link to={"/home"}>返回</Link>
            </span>
            <Form {...layout} name={"test-form"} onFinish={onFinish} validateMessages={validateMessages}>
                <Item
                    name={['user', 'name']}
                    label={"姓名"}
                    rules={[{
                        required: true
                    }]}
                >
                    <Input />
                </Item>
                <Item
                    name={["user", "gender"]}
                    label={"性别"}
                    initialValue={"nan"}
                >
                    <Radio.Group defaultValue={"nan"}>
                        <Radio value={"nan"}>未知</Radio>
                        <Radio value={"male"}>男</Radio>
                        <Radio value={"female"}>女</Radio>
                    </Radio.Group>
                </Item>
                <Item
                    name={["user", "age"]}
                    label={"年龄"}
                    initialValue={21}
                    rules={[{
                        type: "number",
                        min: 0,
                        max: 1000
                    }]}
                >
                    <InputNumber defaultValue={21}/>
                </Item>
                <Item
                    name={["user", "email"]}
                    label={"邮箱"}
                    rules={[{
                        type: "email"
                    }]}
                >
                    <Input/>
                </Item>
                <Item
                    name={["user", "intro"]}
                    label={"自我介绍"}
                >
                    <TextArea />
                </Item>
                <Item wrapperCol={{...layout.wrapperCol, offset: 10}}>
                    <Button type={"primary"} htmlType={"submit"}>交了</Button>
                </Item>
            </Form>
        </div>
    </>
}

export default MyForm;
