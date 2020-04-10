<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/img/logo/logo.png" alt="logo">
        <span>空气质量分析系统</span>
      </div>
      <div>
        <el-button type="primary">主要按钮</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <div class="city-logo">
          <img src="../assets/img/logo/city.png" alt="city">
        </div>
        <Input></Input>
        <el-menu
                router
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
      </el-aside>
      <el-main>
          <router-view></router-view>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "../components/NavMenu/NavMenu";
import Input from "../components/Input/Input";
import CityView from "../components/CityView/CityView";

export default {
  name: 'Home',
  components: {
    NavMenu,
    Input,
    CityView,
  }
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
  span{
    margin-left: 30px;
  }
  .el-aside {
    /*background-color: #4b4e64;*/
    background-color: #545c64;
    width: 300px;
  }

  .el-main {
    background-color: #E9EEF3;

  }
  .city-logo{
    width: 64px;
    height: 64px;
    margin-top:40px;
    margin-left: 118px;
  }
</style>
