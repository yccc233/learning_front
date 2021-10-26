import {Modal} from "antd";
import React from "react";
import EchartModal_Js from "./echart_js";
import EchartModal_React from "./echart_react";
import GoJSModal_Js from "./gojs_js";
import GoJSModal_React from "./gojs_react";

function MyModal(props) {
    const {visible, type, onOk, onCancel} = props;
    return (
        <>
            <Modal
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                closable={false}
                footer={false}
            >
                {
                    type === "gojs_react" && <GoJSModal_React />
                }{
                    type === "gojs_js" && <GoJSModal_Js />
                }{
                    type === "echart_react" && <EchartModal_React />
                }{
                    type === "echart_js" && <EchartModal_Js />
                }
                
            </Modal>
        </>
    );
}

export default MyModal;