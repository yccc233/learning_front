
import EChartsReact from "echarts-for-react";

function EchartModal_React() {
    const options = {
        title: {
            text: "learn啊",
            subtext: "这是副标题描述",
            sublink: "http://www.baidu.com"
        },
        grid: { //图表的样式
            top: 60,
            right: 30,
            bottom: 8,
            left: 16,
            containLabel: true, //x，y轴标签
        },
        xAxis: {
            type: "category",
            splitLine: {    //背景网格图
                show: true
            },
            boundaryGap : true, //x轴点位上
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: "value"
        },
        series: [{
            name: "幸运值",
            type: "bar",
            data: [923, 932, 865, 56, 129, 678, 353],
            // smooth: true
        },{ //系列数据
            name: "消费",
            type: "line",
            areaStyle: {normal: {color: "lightblue"}},    //线条以下区域填色
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            smooth: true
        }],
        tooltip: {  //提示工具触发条件
            trigger: "axis",
            // formatter: "{a}<br />{b} : {c}元<br />{d} : {e}元"   //手动更改描述
            axisPointer: {
                animate: true
            }
        },
        toolbox: {  //右上角的工具盒子
            feature: {
                saveAsImage: {} //保存图片
            }
        },
        legend: {   //图例标签
            data: ["消费", "幸运值"]
        }
    };
    return <>
        <EChartsReact option={options} />
    </>
}

export default EchartModal_React;