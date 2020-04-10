<template>
    <div>
        <CityView v-on:getdata="getAqi" v-on:getWeather="getWeather"></CityView>
        <div class="tips">
            <div class="health-tips">
                <div class="tip">
                    <div class="icon">
                        <img src="../../assets/img/logo/tip.png" alt="">
                    </div>
                    <div class="text">
                        <span>健康提示</span>
                    </div>

                </div>
                <el-tabs type="border-card"
                         :stretch="true"
                >
                    <el-tab-pane label="一级">空气质量指数为0－50，空气质量级别为一级，空气质量状况属于优。此时，空气质量令人满意，基本无空气污染，各类人群可正常活动。</el-tab-pane>
                    <el-tab-pane label="二级">空气质量指数为51－100，空气质量级别为二级，空气质量状况属于良。此时空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响，建议极少数异常敏感人群应减少户外活动。</el-tab-pane>
                    <el-tab-pane label="三级">空气质量指数为101－150，空气质量级别为三级，空气质量状况属于轻度污染。此时，易感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。</el-tab-pane>
                    <el-tab-pane label="四级">空气质量指数为151－200，空气质量级别为四级，空气质量状况属于中度污染。此时，进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响，建议疾病患者避免长时间、高强度的户外锻练，一般人群适量减少户外运动。</el-tab-pane>
                    <el-tab-pane label="五级">空气质量指数为201－300，空气质量级别为五级，空气质量状况属于重度污染。此时，心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状，建议儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。</el-tab-pane>
                    <el-tab-pane label="六级">空气质量指数大于300，空气质量级别为六级，空气质量状况属于严重污染。此时，健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病，建议儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动。</el-tab-pane>
                </el-tabs>
            </div>
            <div class="forecasts">
                <div class="tomorrow">
                    <div class="top">
                        <span>明天</span>
                    </div>
                    <div class="descript">
                        <div class="weath">
                            <img  src="../../assets/img/weather/天气-多云.png" alt="">
<!--                            <img v-else-if="forecasts[1].text_day=='晴'" src="../../assets/img/weather/天气-晴.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='阴'" src="../../assets/img/weather/天气-阴天.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='小雨'" src="../../assets/img/weather/天气-小雨.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='中雨'" src="../../assets/img/weather/天气-中雨.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='大雨'" src="../../assets/img/weather/天气-大雨.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='雷阵雨'" src="../../assets/img/weather/天气-雷雨.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='雾'" src="../../assets/img/weather/雾.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='小雪'" src="../../assets/img/weather/天气-小雪.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='中雪'" src="../../assets/img/weather/天气-中雪.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='大雪'" src="../../assets/img/weather/天气-大雪.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='雨夹雪'" src="../../assets/img/weather/天气-雨加雪.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='暴雪'" src="../../assets/img/weather/天气-暴雨.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='雾霾'" src="../../assets/img/weather/天气-雾霾.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='沙尘'" src="../../assets/img/weather/天气-沙尘.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='冰雹'" src="../../assets/img/weather/天气-冰雹.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='霜'" src="../../assets/img/weather/天气-霜.png" alt="">-->
<!--                            <img v-else-if="forecasts[1].text_day=='小雨转晴'" src="../../assets/img/weather/天气-小雨转晴.png" alt="">-->
                        </div>
                        <div class="des">
                            <span>8~16℃</span>
                        </div>
                        <div class="week">
                            <span>星期四</span>
                        </div>
                    </div>
                </div>
                <div class="after-day">
                    <div class="top">
                        <span>后天</span>
                    </div>
                    <div class="descript">
                        <div class="weath">
                            <img  src="../../assets/img/weather/天气-小雨.png" alt="">
                            <!--                            <img v-else-if="forecasts[1].text_day=='晴'" src="../../assets/img/weather/天气-晴.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='阴'" src="../../assets/img/weather/天气-阴天.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='小雨'" src="../../assets/img/weather/天气-小雨.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='中雨'" src="../../assets/img/weather/天气-中雨.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='大雨'" src="../../assets/img/weather/天气-大雨.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='雷阵雨'" src="../../assets/img/weather/天气-雷雨.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='雾'" src="../../assets/img/weather/雾.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='小雪'" src="../../assets/img/weather/天气-小雪.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='中雪'" src="../../assets/img/weather/天气-中雪.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='大雪'" src="../../assets/img/weather/天气-大雪.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='雨夹雪'" src="../../assets/img/weather/天气-雨加雪.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='暴雪'" src="../../assets/img/weather/天气-暴雨.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='雾霾'" src="../../assets/img/weather/天气-雾霾.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='沙尘'" src="../../assets/img/weather/天气-沙尘.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='冰雹'" src="../../assets/img/weather/天气-冰雹.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='霜'" src="../../assets/img/weather/天气-霜.png" alt="">-->
                            <!--                            <img v-else-if="forecasts[1].text_day=='小雨转晴'" src="../../assets/img/weather/天气-小雨转晴.png" alt="">-->
                        </div>
                        <div class="des">
                            <span>10~17℃</span>
                        </div>
                        <div class="week">
                            <span>星期五</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="indexes">
                <div class="outdoor">
                    <div class="index">
                        <div class="tip">
                            <div class="icon">
                                <img src="../../assets/img/logo/outdoor.png" alt="">
                            </div>
                            <div class="text">
                                <span>出行指数</span>
                            </div>
                        </div>
                        <el-rate
                                v-model="outdoor"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>


                </div>
                <div class="sport">
                    <div class="tip">
                        <div class="icon">
                            <img src="../../assets/img/logo/sport.png" alt="">
                        </div>
                        <div class="text">
                            <span>户外运动</span>
                        </div>
                    </div>
                    <el-rate
                            v-model="sport"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                </div>
                <div class="project">
                    <div class="tip">
                        <div class="icon">
                            <img src="../../assets/img/logo/project.png" alt="">
                        </div>
                        <div class="text">
                            <span>户外施工</span>
                        </div>
                    </div>
                    <el-rate
                            v-model="project"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}">
                    </el-rate>
                </div>
            </div>

        </div>
        <div class="charts"
             v-loading="loading"
             element-loading-text="正在载入数据"
             element-loading-spinner="el-icon-loading"
        >

            <div id="pie"></div>
            <div id="line_charts"></div>
        </div>
    </div>
</template>

<script>
    import CityView from "../CityView/CityView";
    import {post, request} from "../../network/request";
    import axios from "axios";
    export default {
        name: "Analyze",
        components:{
            CityView,
        },
        data(){
            return{
                aqi:0,
                loading:true,
                forecasts:[],
                outdoor:3.7,
                sport:4.0,
                project:4.0,
                data:[
                    {name:'PM2.5',value:24},
                    {name:'PM10',value:36},
                    {name:'SO2',value:9},
                    {name:'NO2',value:28},
                    {name:'CO',value:0.8},
                    {name:'O3',value:23},
                ],
                city_name:'上海',
                datetime:'2020-03-20 12:00:00',
                history_data:{aqi:[],pm25:[],pm10:[],so2:[],no2:[],co:[],o3:[],datetime:[]},
            }
        },
        computed:{

        },
        methods:{
            getAqi(value){
                this.aqi = value
            },
            getWeather(value){
                this.forecasts = value
                console.log(this.forecasts)
            },
            drawPie(){
                let myPie = this.$echarts.init(document.getElementById('pie'))
                let option = {
                    title: {
                        text: this.city_name + '污染气体成分分析',
                        subtext: '更新时间：' + this.datetime,
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} <br/> 占比： {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO','O3']
                    },
                    series: [
                        {
                            name: '成分占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                myPie.setOption(option)
            },
            drawLine(){
                let myLine = this.$echarts.init(document.getElementById('line_charts'))
                let option = {
                    title: {
                        text: '指数走势图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['AQI','PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.history_data.datetime
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'AQI',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.aqi
                        },
                        {
                            name: 'PM2.5',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.pm25
                        },
                        {
                            name: 'PM10',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.pm10
                        },
                        {
                            name: 'SO2',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.so2
                        },
                        {
                            name: 'NO2',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.no2
                        },
                        {
                            name: 'CO',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.co
                        },
                        {
                            name: 'O3',
                            type: 'line',
                            stack: '总量',
                            data: this.history_data.o3
                        }
                    ]
                }
                myLine.setOption(option)
            },
            getData(params){
                post('http://localhost:8000/aqi/select/',
                    params
                ).then( res =>{
                    // console.log(res)
                    let data = {}
                    data = res.data
                    //去除datetime中的T ,Z
                    let temp = data.datetime.slice(0,-1)
                    let arr = temp.split("T")
                    //绑定数据
                    this.datetime = arr.join(" ")
                    this.city_name = data.cityname
                    this.data=[] //清空默认数据
                    this.data.push(
                        {name:'PM2.5',value:data.pm25},
                        {name:'PM10',value:data.pm10},
                        {name:'SO2',value:data.SO2},
                        {name:'NO2',value:data.NO2},
                        {name:'CO',value:data.CO},
                        {name:'O3',value:data.O3},
                    )
                    //请求到数据后重新渲染图表
                    this.loading = false
                    this.drawPie()
                    // console.log(data)

                }).catch(err =>{
                    console.log(err)

                })
            },
            getHistory_data(params){
                request({
                    url:'/aqi/history_data/',
                    params,
                }).then(res =>{
                    // console.log(res)
                    let data = res.data
                    let obj = {}
                    data = data.reduce((item,next) =>{ //数组去重
                        obj[next.datetime] ? '': obj[next.datetime] = true && item.push(next)
                        return item
                    },[])
                    for (let item of data){
                        this.history_data.aqi.push(item.aqi)
                        this.history_data.pm25.push(item.pm25)
                        this.history_data.pm10.push(item.pm10)
                        this.history_data.so2.push(item.so2)
                        this.history_data.no2.push(item.no2)
                        this.history_data.co.push(item.co)
                        this.history_data.o3.push(item.o3)
                        this.history_data.datetime.push(item.datetime.slice(11))
                    }
                    this.loading = false
                    this.drawLine()
                    // console.log(this.history_data)
                }).catch(err =>{
                    console.log(err)
                })
            },
            showLocation(res) {//jsonp回调的方法，拿到返回的城市名

                // let cityname = res.content.address_detail.city
                let location = res.content.address_detail.city.slice(0,-1)
                this.getData({cityname:location}) //根据定位城市获取空气质量信息
                this.getHistory_data({cityname:location})
                // console.log(location)
            },
            getLocation(){ //获取IP进行定位
                this.$jsonp( //使用jsonp处理跨域问题
                    'https://api.map.baidu.com/location/ip',
                    {
                        ak:'v46u7PXIss9RSuoLy0e3LKoGwmLqaGnB',
                        coor:'bd09ll',
                        callback:'showLocation', //回调函数
                    }
                ).then(res =>{
                    //jsonp 返回的数据不能直接打印，必须通过回调函数
                    this.showLocation(res)
                }).catch(err =>{
                    // console.log('失败')
                    this.getData({cityname:'上海'})
                    this.getHistory_data({cityname:'上海'})
                })
            },

        },
        created() {
            let type = undefined
            type = typeof(this.$route.query.cityname)
            if (type=='string'){
                this.getData({cityname:this.$route.query.cityname})
                this.getHistory_data({cityname:this.$route.query.cityname})
            }else{
                this.getLocation()
            }
        },
        mounted() {
            this.drawPie()
            this.drawLine()
        },
        watch: { //监听路由变化，query变化时刷新数据
            '$route' (to, from) {
                if (this.city_name!==this.$route.query.cityname){
                    let type = typeof(this.$route.query.cityname)
                    if(type=='string'){
                        this.getData({cityname:this.$route.query.cityname})
                        this.getHistory_data({cityname:this.$route.query.cityname})
                    }else{
                        this.getLocation()
                    }

                }

            }

        }
    }
</script>

<style scoped>
    .week span{
        font-family: "Microsoft YaHei";
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        color: #E9EEF3;
        margin-left: 37%;
    }
    .week{
        height: 30px;
        margin-top: 12px;
    }
    .des span{
        font-family: "Microsoft YaHei";
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        color: #E9EEF3;
        margin-left: 36%;
    }
    .des{
        height: 30px;


    }
    .weath{
        margin-left: 38%;
    }
    .descript{
        width:100%;
        height: 64px;
        margin-top: 5px;
    }
    .top{
        height:30px;
        margin-top: 10px;
    }
    .top span{
        font-family: "Microsoft YaHei";
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        color: #E9EEF3;
        margin-left: 40%;
    }
    .after-day{
        width: 50%;
        height: 200px;
        float: left;
    }
    .tomorrow{
        width: 50%;
        height: 200px;
        float: left;

    }
    .forecasts{
        width: 35%;
        height: 200px;
        background: #76c327;
    }
    .sport{
        width: 100%;
        height: 60px;
    }
    .outdoor{
        width: 100%;
        height: 60px;
        margin-top: 10px;
    }
    .index{
        float: left;
    }

    .tip span{
        color: #EFDC31;
        font-family: "Microsoft YaHei";
        font-size: 20px;
        line-height: 32px;
        margin-left: 0!important;

    }
    .icon{
        width: 32px;
        height: 32px;
        float: left;
    }
    .text{

        float: left;
        height: 32px;
    }
    .tip{
        height: 32px;
        width: 150px;
    }
    .el-rate__item{
        margin-left: 0!important;
    }
    .el-rate{
        width: 150px;
    }
    .el-tag{
        margin-left: 0!important;
    }
    .indexes{
        width: 16%;
        float: left;

    }
    .health-tips{
        width: 35%;
    }
    .tips{
        width: 100%;
        height: 200px;
        position: relative;
        top: -2px;
        background: #126f29;
        display: flex;
        justify-content: space-between;
    }
    #pie{
        width: 700px;
        height: 500px;
    }
    #line_charts{
        width: 800px;
        height: 500px;

    }
    .charts{
        display: flex;
        justify-content: space-between;
    }
</style>