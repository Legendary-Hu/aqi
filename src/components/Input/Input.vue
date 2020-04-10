<template>
    <el-autocomplete
            v-model.trim="search_word"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市"
            :trigger-on-focus="false"
            @select="handleSelect"
    >
        <el-button slot="append" @click="search(search_word)" icon="el-icon-search"></el-button>
    </el-autocomplete>
</template>

<script>
    import {request,post} from '../../network/request'
    export default {
        name: "Input",
        data() {
            return {
                citys: [],
                search_word: '',
                state: '',
                timeout:  null,
                data:{}
            };
        },
        methods: {
            loadAll() {
                return this.citys
            },

            // 搜索功能
            search(value){
                this.$router.push({
                    path:'/analyze',
                    query:{
                        cityname:this.search_word
                    }
                })
            },
            querySearchAsync(queryString, cb) { //输入远程查询匹配
                if(queryString == ''){
                    return this.citys =[]
                }
                else{               //输入的字符串不为空，远程搜索服务器数据
                    this.citys = []
                    request({
                        url:'/aqi/search',
                        params:{
                            cityname: queryString
                        }
                    }).then( res =>{

                        console.log(res.data)
                        // console.log(res.data.length)
                        for (let i=0; i<res.data.length;i++){
                            this.citys.push({               //注意数组对象必须含有value键，注意格式
                                'value':res.data[i]
                            })
                        }
                        let citys = this.citys;
                        let results = queryString ? citys.filter(this.createStateFilter(queryString)) : citys;

                        clearTimeout(this.timeout);
                        this.timeout = setTimeout(() => {
                            cb(results);//callback函数

                        }, 500);
                        // console.log(this.citys)
                        return this.citys;
                    }).catch(err =>{
                        console.log(err)
                    })
                }
            },

            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };
            },
            handleSelect(item) { //选择建议框中调用搜索功能

                this.search_word = item.value
                this.search(this.search_word)
                // console.log(item);
            }
        },
        mounted() {
             this.loadAll();
        }

    }
</script>

<style scoped>
    .el-autocomplete{
        left:40px!important;
        top: 15px;
        width:229px!important;
    }
    .el-input{
        font-size: 18px;
    }

</style>