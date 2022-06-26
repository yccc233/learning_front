
import * as echarts from 'echarts';
import $ from "jquery";

export default function init() {
    var chartDom = document.getElementById('rg1');
    var myChart = echarts.init(chartDom);
    var option;

    myChart.showLoading();
    $.getJSON('/json/rg/rg1.json', function (graph) {
        myChart.hideLoading();
        graph.nodes.forEach(function (node) {
            node.label = {
                show: node.symbolSize > 30
            };
        });
        option = {
            title: {
                text: 'Les Miserables',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            legend: [
                {
                    // selectedMode: 'single',
                    data: graph.categories.map(function (a) {
                        return a.name;
                    })
                }
            ],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 10
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    });

    option && myChart.setOption(option);
}