<template>
  <div id="app">
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="./assets/img/logo/logo.png" alt="logo">
          <span>空气质量分析系统</span>
        </div>
        <div>
<!--          <el-button type="primary">主要按钮</el-button>-->
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="city-logo">
            <img src="./assets/img/logo/city.png" alt="city">
          </div>
          <Input></Input>
          <el-menu
                  router
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
            <el-menu-item index="/all">
              <i class="el-icon-location"></i>
              <span>空气质量概览</span>
            </el-menu-item>
            <el-menu-item index="/rand">
              <i class="el-icon-office-building"></i>
              <span slot="title">空气质量排名</span>
            </el-menu-item>
            <el-menu-item index="/analyze" >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">空气质量分析</span>
            </el-menu-item>
            <el-menu-item index="/feedback">
              <i class="el-icon-data-line"></i>
              <span slot="title">意见与反馈</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Input from "./components/Input/Input";

export default {
  name: 'app',
  components: {
    Input

  },
  data(){
    return{
      data:{},
    }
  },
  methods:{
    // getdata(value){ //接收input组件传回的数据
    //   this.data = value
    //   console.log(this.data)
    // }
  }
}
</script>

<style>
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .el-rate__text{
    margin-left: 0!important;
  }
  .el-rate__item{
    margin-left: 0!important;
  }
  .el-drawer__body {
    overflow: auto!important;
  }
  .el-menu{
    border-right: none !important;
    margin-top: 25px!important;
  }
  span{
    margin-left: 30px;
  }
  .el-menu-item{
    font-size: 18px !important;
    height:75px !important;
  }
  .el-menu-item [class^=el-icon-]{
    font-size:24px !important;
    margin-right: 6px !important;

  }
  .el-container{
    height: 100%;
  }
  .el-header{
    background: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 50px !important;
    height: 100px !important;
    color: #E9EEF3;
    font-size:32px;
    font-family:"Microsoft YaHei";
  }
  .el-header div {
    display: flex;
    align-items: center;

  }

  .el-aside {
    /*background-color: #4b4e64;*/
    background-color: #545c64;
    width: 300px;
  }

  .el-main {
    padding: 0px!important;
    /*background: url("./assets/img/background/main-bg.png");*/

  }
  .city-logo{
    width: 64px;
    height: 64px;
    margin-top:40px;
    margin-left: 118px;
  }


</style>
