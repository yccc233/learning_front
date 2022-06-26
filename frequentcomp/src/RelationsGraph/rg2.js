
import * as echarts from 'echarts';
import $ from "jquery";

export default function init() {
    var chartDom = document.getElementById('rg2');
    var myChart = echarts.init(chartDom);
    var option;

    myChart.showLoading();
    $.get('/json/rg/rg2.json', function (data) {
        myChart.hideLoading();
        myChart.setOption(
            (option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',
                        data: [data],
                        top: '18%',
                        bottom: '14%',
                        layout: 'radial',
                        symbol: 'emptyCircle',
                        symbolSize: 7,
                        initialTreeDepth: 3,
                        animationDurationUpdate: 750,
                        emphasis: {
                            focus: 'descendant'
                        }
                    }
                ]
            })
        );
    });
    option && myChart.setOption(option);
}