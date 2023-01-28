<template>
  <div>
    <div class="leftbox">
      <div class="logobox">
        <img src="../../public/img/logo/logo_long.png" width="200px" height="100px">
      </div>
      <el-menu
        default-active="2"
        class="leftmenu"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="1-1">会员信息</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span >商家管理</span>
          </template>
          <el-menu-item index="2-1">商家入驻申请</el-menu-item>
          <el-menu-item index="2-2">商家退出申请</el-menu-item>
          <el-menu-item index="2-3">取消商家经营资格</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rightbox">
      <div class="right-top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right-page">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name:'AdminHome',
    data(){
      return{

      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        if(key=='1-1'){
          this.$router.push({name:'usermanage'})
        }
        if(key=='2-1'){
          this.$router.push({name:'sellerisPass'})
        }
        if(key=='2-2'){
          this.$router.push({name:'sellerquit'})
        }
        if(key=='2-3'){
          this.$router.push({name:'sellerdel'})
        }
      }
    }
    
}
</script>

<style scoped>
body{
  background-color: #757575;
}
.leftbox{
  width: 250px;
  margin: 0;
  padding:0;
  float: left;
}
.rightbox{
  position: relative;
  margin: 0 0 0 300px;
  padding: 0;
}
.leftmenu{
  width: 250px;
  float: left;
  height: 87vh;
}
.logobox{
  width: 250px;
  height: 100px;
  background-color:#545c64;
}
.right-top{
  position: relative;
  padding: 20px 0 0 20px;
  height: 40px;
  background-color: #545c64;
  overflow: hidden;
}
.right-page{
  margin: 10px 0 0 0;
  width: 100%;
  background-color: bisque;
  height: 89vh;
}
</style>