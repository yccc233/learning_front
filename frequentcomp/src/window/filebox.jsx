import React, {useEffect, useState} from "react";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

function FileBox() {

    const [loading, setLoading] = useState(false);
    const fileChange = (file, name) => {
        console.log(name, file)
        name === "onChange" && setLoading(false);
        return false;
    }

    useEffect(() => {

        var batchUpload = document.querySelector('#dic_btn');

        batchUpload.addEventListener('mouseup', function () {
            setLoading(true)
            window.interval= setInterval(() => {
                if(document.hasFocus()){
                    window.timeout=  setTimeout(() => {
                        setLoading(false);
                        window.interval&&clearInterval(window.interval);
                    }, 1000);
                }else{
                    setLoading(true)
                    window.timeout&&clearTimeout(window.timeout);
                }
            }, 1000);

        });
    }, [])

    return <>
         <Upload
            onChange={(f) => fileChange(f, "onChange")}
            beforeUpload={(f, fl) => fileChange({f, fl}, "beforeUpload")}
         >
             <Button id={"dic_btn"} icon={<UploadOutlined />} loading={loading}>上传文件弹窗</Button>
         </Upload>
    </>
}


export default FileBox;
