/**
 * 事件的处理教程在readme
 */
import * as echarts from 'echarts';

export default function init() {
    var chartDom = document.getElementById('rg-custom');
    var myChart = echarts.init(chartDom);
    var data = [
        {
            id: "lyc",
            name: '老于哼',
            children: [{
                id: "lycname",
                value: 1,
                name: '姓名',
                children: []
            }, {
                id: "lycage",
                value: 1,
                name: '年龄',
                children: []
            }, {
                id: "lycaddress",
                value: 1,
                name: '工作地址',
                children: []
            }]
        }
    ];

    var option = {
        series: {
            type: 'sunburst',
            data: data,
            radius: [0, '60%'],
            label: {
                rotate: 'radial'
            },
            itemStyle: {
                borderRadius: 7,
                borderWidth: 2
            },
        }
    };

    option && myChart.setOption(option);

    myChart.on('click',function(params) {
        console.log('点击事件', params)
        if (params.data.id === "lyc") {
            data.push(
                {
                    id: "xpz",
                    name: "小胖子",
                    children: [
                        {
                            value: 1,
                            name: '年龄',
                            children: []
                        },
                        {
                            value: 1,
                            name: '年龄',
                            children: []
                        },
                        {
                            value: 1,
                            name: '地址',
                            children: []
                        }
                    ]
                }
            );

            option.data = data;
            option && myChart.setOption(option);
        }
    });
}