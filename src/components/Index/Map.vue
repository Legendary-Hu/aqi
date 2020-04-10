<template>
    <div id="map"
         v-loading="loading"
         element-loading-text="正在渲染地图"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >

    </div>
</template>

<script>
import 'echarts/map/js/china'

import china from 'echarts/map/json/china.json'
import {request} from '../../network/request'
import {geoCoordMap} from '../../position/position'
// this.$echarts.registerMap('china', china)

    export default {
        name: "Map",
        data(){
            return {
                data: [],
                datetime: '2020-03-14 20:18:00',
                loading:true,
            }
        },
        methods:{
            drawMap(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('map'))
                // 绘制图表
                var app = {};
                let data =[]



                request({
                    url:'/aqi/map',

                }).then( res =>{
                    // console.log(res.data)
                    this.datetime = res.data[0].datetime
                    for (let item of res.data) {
                        data.push( {name:item['city_name'],value:parseInt(item['aqi'])})

                    }

                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var geoCoord = geoCoordMap[data[i].name];
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value)
                                });
                            }
                        }
                        // console.log(res)
                        return res;
                    };
                    var option = {
                        backgroundColor: '#404a59',
                        title: {
                            text: '全国主要城市空气质量',
                            subtext: '数据更新时间：'+this.datetime,
                            sublink: 'http://www.pm25.in',
                            left: 'center',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            // formatter:"{b}<br/>AQI:  {c}"
                            formatter: function (params) {
                                return params.name + ' : ' + params.value[2];
                            }
                        },
                        legend: [
                            {
                                orient: 'vertical',
                                y: 'bottom',
                                x: 'right',
                                data: ['AQI'],
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                        ],
                        visualMap: {
                            min: 0,
                            max: 300,
                            calculable: true,
                            color: ['#9C0A4E','#800080','#FF401A','#FFAA00','#EFDC31','#43CE17'],
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        geo: {
                            map: 'china',
                            label: {
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true,
                            zoom:1.24,
                            itemStyle: {
                                normal: {
                                    areaColor: '#323c48',
                                    borderColor: '#111'
                                },
                                emphasis: {
                                    areaColor: '#2a333d'
                                }
                            },

                        },
                        series: [{
                            name: 'AQI',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            // symbolSize: function(val) {
                            //     return val[2] / 7;
                            //     if (val<=50){
                            //         return 8
                            //     }else if (val<=100){
                            //         return 11
                            //     }else if (val <=150){
                            //         return 12
                            //     }else if (val <=200){
                            //         return 13
                            //     }else if (val <=250){
                            //         return 14
                            //     }else if (val <=300){
                            //         return 15
                            //     }else {
                            //         return 16
                            //     }
                            // },
                            symbolSize:11,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#43CE17'
                                }
                            }
                        },
                            {
                                name: 'Top 5',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: convertData(data.sort(function(a, b) {
                                    return b.value - a.value;
                                }).slice(0, 5)),
                                symbolSize: function(val) {
                                    return val[2] / 16;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#FF401A',
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                zlevel: 1
                            }
                        ]
                    }
                    if (option && typeof option === "object") {
                        myChart.setOption(option, true);
                    }
                    this.loading = false
                }).catch( err =>{
                    console.log(err)
                })


            }

        },
        created() {

        },
        mounted() {

            this.drawMap();

        }
    }
</script>

<style scoped>
    #map{
        width: 100%;
        height: 450px;
    }
</style>