import React, { useRef } from 'react';

export default function UploadFile() {


    const fileRef = useRef();

    const analyse = () => {
        fileRef.current.click();
    }
    const fileChange = () => {
        console.log("files", fileRef.current.files);
        const file = fileRef.current.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = function () {
            const fileArrayBuffer = this.result;
            const type = file.type;
            const defName = "测试." + file.name.split(".")[file.name.split(".").length - 1];
            console.log("结果", fileArrayBuffer, type, defName)
        }
    }

    return <>
        <input ref={fileRef} type="file" hidden onChange={fileChange} />
        <button onClick={analyse}>分析</button>
        <a
            href={"/static/新冠期间体温记录.exportData"}
            download={"测试"}
        >下载</a>
    </>;
}
