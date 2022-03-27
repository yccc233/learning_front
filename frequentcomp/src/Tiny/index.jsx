import React, {useState} from "react";
import {Button} from "antd";

function TinyMain() {
    return <div style={{margin: 10}}>
        <Detail1 />
        <div style={{height: 10}}/>
        <Detail2 />
    </div>
}


function Detail1() {
    const content = "2月9日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例29例。其中境外输入病例22例（广东9例，上海8例，吉林2例，浙江1例，福建1例，广西1例），含2例由无症状感染者转为确诊病例（广东1例，广西1例）；本土病例7例（均在广西百色市）。无新增死亡病例。新增疑似病例1例，为境外输入病例（在上海）。";
    return <div style={{border: "2px solid #666", width: 500, padding: 10, background: "#ccc"}}>
        {content}
    </div>
}

function Detail2() {

    const content = "2月9日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例29例。其中境外输入病例22例（广东9例，上海8例，吉林2例，浙江1例，福建1例，广西1例），含2例由无症状感染者转为确诊病例（广东1例，广西1例）；本土病例7例（均在广西百色市）。无新增死亡病例。新增疑似病例1例，为境外输入病例（在上海）。";
    const [isAll, setAll] = useState(false);

    return <div style={{border: "2px solid #666", width: 500, padding: "10px 50px 10px 10px", background: "#ccc", position: "relative"}}>
        <Button type={"link"} style={{position: "absolute", right: 0, top: 5}} onClick={() => {
            setAll(!isAll)
        }}>{isAll ? "收起" : "展开"}</Button>
        <div style={isAll ? {} : {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        }}>
            {content}
        </div>
    </div>
}

export default TinyMain;
