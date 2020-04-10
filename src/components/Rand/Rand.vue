<template>
    <div>
        <div class="banner">
            <div class="title">
                <span>大气污染城市统计</span>
            </div>
            <div class="list">
                <ul>
                    <li style="color: #9C0A4E">严重污染城市：{{serious}}</li>
                    <li style="color: #800080">重度污染城市：{{danger}}</li>
                    <li style="color:#FF401A ">中度污染城市：{{mid_poll}}</li>
                    <li style="color: #FFAA00">轻度污染城市：{{light_poll}}</li>
                </ul>
            </div>
            <div class="slogan">
                <p>空气质量关乎您和家人的健康,美好环境来自每个人的珍惜与维护。<br>
                    同呼吸、共担当、齐行动！</p>
            </div>
        </div>

        <div class="rand">
            <div class="top">
                <el-tag type="success">空气质量最佳Top20实时排名</el-tag>
                <el-table
                        v-loading="loading"
                        element-loading-text="正在载入数据"
                        element-loading-spinner="el-icon-loading"
                        :data="top20"
                        style="width: 80%;height: 528px"
                        :row-style="{height:0+'px'}"
                        :cell-style="{padding:0+'px'}"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="rand"
                            label="排名"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="cityname"
                            label="城市"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="variable"
                            :label="keyword">
                    </el-table-column>
                    <el-table-column
                            prop="level_index"
                            label="空气质量等级">

                    </el-table-column>
                </el-table>
            </div>
            <div class="last">
                <el-tag type="danger">空气质量最差Top20实时排名</el-tag>
                <el-table
                        v-loading="loading"
                        element-loading-text="正在载入数据"
                        element-loading-spinner="el-icon-loading"
                        :data="last20"
                        style="width: 100%;height: 528px"
                        :row-style="{height:0+'px'}"
                        :cell-style="{padding:0+'px'}"
                        class="right"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="rand"
                            label="排名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cityname"
                            label="城市"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="variable"
                            :label="keyword">
                    </el-table-column>
                    <el-table-column
                            prop="level_index"
                            label="空气质量等级">

                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {request} from '../../network/request'
    export default {
        name: "Rand",
        data(){
            return{
                keyword:'AQI',
                top20:[],
                last20:[],
                serious:0,
                danger:0,
                mid_poll:0,
                light_poll:0,
                loading:true,
            }
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (row.level_index ==='优' ) {
                    return 'success-row';
                } else if (row.level_index ==='良') {
                    return 'middle-row';
                } else if(row.level_index==='轻度污染'){
                    return  'mild-row'
                } else if(row.level_index==='中度污染'){
                    return  'moderate-poll-row'
                } else if(row.level_index==='重度污染'){
                    return  'warning-row'
                }else
                    return 'serious-row';
            },
            getData() {
                axios.all([request({
                    url:'/aqi/top20/'
                }),request({
                    url:'/aqi/last20/'
                })]).then(axios.spread( (res1,res2) =>{
                    // console.log(res1)
                    let top = res1.data
                    for (let i = 0; i <top.length ; i++) {
                        this.top20.push({
                            rand:i+1,
                            cityname:top[i].city_name,
                            variable:top[i].aqi,
                            level_index:top[i].level_index
                        })
                    }
                    let last = res2.data
                    for (let i = 0; i <last.length ; i++) {
                        this.last20.push({
                            rand: i+1,
                            cityname: last[i].city_name,
                            variable: last[i].aqi,
                            level_index:last[i].level_index
                        })

                    }
                    this.loading = false
                })).catch(err =>{
                    console.log(err)
                    this.$notify.error({
                        title:'数据加载失败！',
                        message: ''
                    });
                })
            },
            getOverview(){
                request({
                    url: '/aqi/overview/',
                }).then(res =>{
                    // console.log(res.data)
                    this.serious = res.data.serious
                    this.danger = res.data.danger
                    this.mid_poll = res.data.mid_poll
                    this.light_poll = res.data.light_poll
                } ).catch(err =>{
                    console.log(err)
                })
            }
        },
        created() {
            this.getData()
            this.getOverview()
        }
    }
</script>

<style scoped>
    .last{
        width: 50%;
        margin-right: 0px;
    }
    .last span{
        margin-left: 0!important;
    }
    .top span{
        margin-left: 0!important;
    }
    p{
        color: #E9EEF3;
    }
    .slogan{
        width: 250px;
        height: 100px;
        position: absolute;
        top:200px;
        right: 155px;
    }
    ul{
        list-style: none;
        margin-left: 0;
    }
    .list{
        position: absolute;
        top: 90px;
        right: 275px;

    }
    .title span{
        font-family: "Microsoft YaHei";
        font-size: 28px;
        color: #E9EEF3;
        line-height: 50px;
        margin-left: 25px!important;
    }
    .title{
        width: 255px;
        height: 50px;
        position: absolute;
        right: 162px;
        top: 45px;
    }
    .banner{
        position: relative;
        top: -16px;
        width:100% ;
        height: 370px;
        background: url("../../assets/img/background/banner1.jpg");
    }
    .el-table .success-row {
        background:rgba(67,206,23,0.5);

    }
    .el-table .middle-row {
        background: rgba(239,220,49,0.5);
    }
    .el-table .mild-row {
        background: rgba(255,170,0,0.5);
    }
    .el-table .moderate-poll-row {
        background: rgba(255,64,26,0.5);
    }
    .el-table .warning-row {
        background: rgba(128,0,128,0.5);
    }
    .el-table .serious-row {
        background: rgba(156,10,78,0.5);
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: initial !important;
    }
    .top{
        width: 50%;
        border-right:1px #EFDC31 dot-dash  ;
    }

    .right{
        right: 0;
    }
    .rand{
        display:flex;
        justify-content:space-between;
        margin-top: 15px;
    }
</style>