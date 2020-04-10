<template>
            <el-menu
                    router
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="/home/all">
                        <i class="el-icon-location"></i>
                        <span>全国空气质量状况</span>
                </el-menu-item>
                <el-menu-item index="/home/rand">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">城市空气质量排名</span>
                </el-menu-item>
                <el-menu-item index="/home/analyse" >
                    <i class="el-icon-pie-chart"></i>
                    <span slot="title">城市空气质量分析</span>
                </el-menu-item>
                <el-menu-item index="/home/predict">
                    <i class="el-icon-data-line"></i>
                    <span slot="title">空气质量预测</span>
                </el-menu-item>
            </el-menu>

</template>

<script>
    export default {
        name: "NavMenu",

    }
</script>

<style scoped>
    .el-menu{
        border-right: none !important;
        margin-top: 25px!important;
    }
    .el-menu-item{
        font-size: 18px !important;
        height:75px !important;
    }
    .el-menu-item [class^=el-icon-]{
        font-size:24px !important;
        margin-right: 6px !important;

    }
</style>