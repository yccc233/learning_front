
import React from "react";
import '../../css/home.css';
import {Link} from "react-router-dom";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip, Avatar, Popover} from "antd";

function Topbar(props) {
    const {name, role} = props;
    
    const fnTip = [
      "",
      "",
      "",
      "有所有的权限呀"
    ];
    
    const Context = () => (
        <div>
            <div style={{fontSize: "16px"}}>{name}</div>
            <div style={{fontSize: "10px", color: "cadetblue"}}>{+role === 0 ? "收件人" : +role === 1 ? "快递员" : +role === 2 ? "工作人员" : "管理员"}</div>
            <hr />
            <Link to={"/login"}>退出登陆</Link>
        </div>
    )
    console.log("topbar", props)
    return <>
        <div className={"top-bar"}>
            <span style={{flex: 1, fontSize: "18px", color: "#000", paddingLeft: "6px"}}>
                 <Tooltip title={fnTip[role]} placement={"bottomLeft"}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </span>
           
            <span style={{width: "70px"}}>
                <span>你好 ! </span><span className={"topbar-account"}>
                    <Popover content={Context} placement={"bottomLeft"} title={"基本信息"}>
                        <Avatar size={25}>{name.substr(0, 1).toUpperCase()}</Avatar>
                    </Popover>
                    
                    </span>
            </span>
        </div>
    </>
}



export default Topbar;