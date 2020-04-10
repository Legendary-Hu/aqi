<template>
    <el-table
            v-loading="loading"
            element-loading-text="正在载入数据"
            element-loading-spinner="el-icon-loading"
            :data="data"
            style="width:100%"
            :row-style="{height:0+'px'}"
            :cell-style="{padding:0+'px'}"
            height="387"
            :row-class-name="tableRowClassName">
        <el-table-column
                prop="datetime"
                label="时间"
                >
        </el-table-column>
        <el-table-column
                prop="cityname"
                label="城市"
                >
        </el-table-column>
        <el-table-column
                prop="aqi"
                label="AQI">
        </el-table-column>
        <el-table-column label="首要污染物">
            <template slot-scope="scope">
                <p v-html="scope.row.max_poll"></p>
            </template>
        </el-table-column>
        <el-table-column
                prop="level_index"
                label="等级">
        </el-table-column>
    </el-table>
</template>

<style>
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
</style>

<script>
    import {request} from '../../network/request'
    export default {
        name:'TableList',
        data() {
            return {
                loading:true,
                data:[]
            }
        },
        computed:{

        },
        methods: {
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
            getData(){
                request({
                    url:'/aqi/table'
                }).then(res =>{
                    // console.log(res.data)
                    for( let item of res.data){
                        this.data.push({datetime:item['datetime'],cityname:item['city_name'],aqi:item['aqi'],max_poll:item['max_poll'],level_index:item['level_index']})
                    }
                    this.loading = false
                    // console.log(this.data)
                }).catch(err =>{
                    console.log(err)
                    this.$notify.error({
                        title:'数据加载失败！',
                        message: ''
                    });
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>