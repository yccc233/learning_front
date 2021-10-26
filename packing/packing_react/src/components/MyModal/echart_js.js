
import {useEffect} from "react";
const echart = require("echarts");
const $ = require("jquery");

//注册主题
let colorPalette = ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];
echart.registerTheme('vintage', {
    color: colorPalette,
    backgroundColor: '#fef8ef',
    graph: {
        color: colorPalette
    }
});

const option = {
    title: {
        text: "test",
        subtext: "test and describe",
        left: "center"
    },
    tooltip: {
        trigger: "item"
    },
    legend: {
        orient: "vertical",
        left: "left"
    },
    series: [{
        name: "random distribution",
        type: "pie",
        radius: "40%",  //设置饼图大小
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
    }],
    emphasis: { //饼图样式
        itemStyle: {
            shadowBlur: 5, //阴影大小
            shadowOffsetX: 0,   //x轴阴影
            shadowColor: 'rgba(0, 0, 0, 0.3)'   //阴影颜色
        }
    }
};

function EchartModal_Js(props) {
    
    useEffect(() => {
        //简单用法 同react
        const myechart = echart.init(document.getElementById("myEChartBoard"), "vintage")
        myechart.setOption(option);
        
        //绑定点击事件
        
        myechart.on("click", function (parames) {
            console.log(parames)
        });
        
        //从接口上获取节点并表示出图谱
        //...
        
    }, []);
    
    return <>
        <div id="myEChartBoard" style={{width: "450px", height: "400px"}}/>
    </>
}

export default EchartModal_Js;