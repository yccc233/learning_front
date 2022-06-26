
import * as echarts from 'echarts';

export default function init() {
    var chartDom = document.getElementById('rg3');
    var myChart = echarts.init(chartDom);


    var option = {
        series: {
            type: "sunburst",
            data: [
                {
                    name: "Food",
                    children: [
                        {
                        value: 3,
                        name: "Fruit",
                        children: [{
                            value: 1,
                            name: "Apple"
                        }, {
                            value: 2,
                            name: "Orange",
                            children: [{
                                name: "Seville Orange",
                                value: 1
                            }, {
                                name: "Blood Orange",
                                value: 1
                            }]
                        }]
                    }, {
                        value: 9,
                        name: "Meat",
                        children: [{
                            value: 6,
                            name: "Beaf",
                            children: [{
                                name: "Sirloin",
                                value: 1
                            }, {
                                name: "Rib",
                                value: 1
                            }, {
                                name: "Chuck",
                                value: 1
                            }, {
                                name: "Shank",
                                value: 1
                            }]
                        }, {
                            value: 2,
                            name: "Chicken",
                            children: [{
                                name: "Wings",
                                value: 1
                            }]
                        }, {
                            name: "Breast",
                            value: 1
                        }]
                    }]
                }, {
                    value: 6,
                    name: "Drinks",
                    children: [
                        {
                        value: 3,
                        name: "Wine",
                        children: [{
                            name: "USA",
                            value: 2
                        }, {
                            name: "Europe",
                            children: [{
                                name: "Germany",
                                value: 1
                            }]
                        }]
                    }, {
                        name: "Soft Drink",
                        children: [{
                            value: 3,
                            name: "Juice",
                            children: [{
                                name: "Apple Juice",
                                value: 1
                            }, {
                                name: "Orange Juice",
                                value: 2
                            }]
                        }]
                    }]
                }, {
                    value: 6,
                    name: "Fashion",
                    children: [
                        {
                        name: "Clothing",
                        children: [{
                            name: "Shirts",
                            value: 1
                        }, {
                            name: "Jackets",
                            value: 3,
                            children: [{
                                name: "Men",
                                value: 1
                            }, {
                                name: "Woman",
                                value: 1
                            }]
                        }, {
                            value: 2,
                            name: "Coats",
                            children: [{
                                name: "Men",
                                value: 1
                            }, {
                                name: "Woman",
                                value: 1
                            }]
                        }]
                    }]
                }, {
                    name: "Computers",
                    children: [
                        {
                        name: "Components",
                        value: 4,
                        children: [{
                            name: "Barebones",
                            value: 1
                        }, {
                            value: 2,
                            name: "External",
                            children: [{
                                name: "Hard Drives",
                                value: 2
                            }]
                        }, {
                            name: "Monitors",
                            value: 1
                        }]
                    }, {
                        value: 3,
                        name: "Other",
                        children: [{
                            name: "USB",
                            value: 1
                        }, {
                            name: "Cases"
                        }, {
                            name: "Sound Cards",
                            value: 1
                        }]
                    }]
                }]
        }
    };

    myChart.setOption(option);
    option && myChart.setOption(option);
}