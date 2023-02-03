<template>
  <div>
    <div class="leftbox">
      <div class="logobox">
        <img src="../../public/img/logo/logo_long.png" width="200px" height="100px">
      </div>
      <el-menu
        default-active="0"
        class="leftmenu"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="0" style="">首页</el-menu-item>
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
        <el-menu-item index="999">关于我们</el-menu-item>
      </el-menu>
    </div>
    <div class="header">
      <div class="header-left">
        <el-breadcrumb text-color="red" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="t in tags " :key="t.name" :to="t.path">{{t.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar v-if="!user.imgurl" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <el-avatar v-if="user.imgurl" :src="imgPath.userImg(user.imgurl)"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home" command="myhome">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-close" command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
    <div class="rightbox">
      <div class="right-top">
        <el-button 
        v-for="t in tags "
        :key="t.name"
        type="primary" 
        size="small"
        round
        :plain="t.plain"
        @click="tagRouter(t)"
        >
        {{t.name}}<i v-if="t.name!='首页'" @click="delTag(t)" class="el-icon-close el-icon--right"></i>
        </el-button>
      </div>
      <div class="right-page">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import imgPath from '../utils/imgPath'
export default {
    name:'AdminHome',
    data(){
      return{
        imgPath,
        that: '2-2',
        pageList:{
          '0':{
            name:'首页',
            route:'adminfirstpage',
            path:'/adminhome/adminfirstpage'
          },
          '1-1':{
            name:'会员信息',
            route:'usermanage',
            path:'/usermanage'
          },
          '2-1':{
            name:'商家入驻申请',
            route:'sellerisPass',
            path:'/sellermanage/sellerisPass'

          },
          '2-2':{
            name:'商家退出申请',
            route:'sellerquit',
            path:'/sellermanage/sellerquit'

          },
          '2-3':{
            name:'取消商家经营资格',
            route:'sellerdel',
            path:'/sellermanage/sellerdel'
          },
          '999':{
            name:'关于我们',
            route:'aboutme',
            path:'/adminhome/aboutme'
          },
        }
        ,
        tags: [
          { name: '首页', index: '0' ,route:'adminfirstpage',closable:false,plain:true,path:'/adminhome/adminfirstpage'},
        ]
      }
    },
    computed:{
      ...mapState(['user'])
    },
    methods:{
      ...mapActions(['checkUser']),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
          if(!this.$route.path.includes(this.pageList[key].route)){
            this.$router.push({name:this.pageList[key].route})
          }
          this.tags.forEach(t=>{
                t.plain=true
                if(t.index==key){
                  t.plain=false
                }
              })
          for (const t of this.tags) {
            if(t.index==key){
              return
            }
          }
          this.tags.push({name:this.pageList[key].name,index:key,route:this.pageList[key].route,path:this.pageList[key].path})
      },
      delTag(tag){
        this.tags=this.tags.filter(t=>{
          return t.name!=tag.name
        })
      },
      tagRouter(tag){
        this.tags.forEach(t=>{
                t.plain=true
                if(t==tag){
                  t.plain=false
                }
              })
        if(!this.$route.path.includes(tag.route)){
          this.$router.push({name:tag.route})
        }
      },
      handleCommand(command){
        if(command=='myhome'){
          this.$router.push({name:'adminfirstpage'})
        }
        if(command=='exit'){
          localStorage.removeItem('token')
          this.$router.push({name:'userlogin'})
        }
      }
    },
    mounted(){
      this.checkUser(localStorage.getItem('token'))
    },
    beforeDestroy(){
      let date=new Date()
      let arr=[date.toLocaleDateString(),date.toLocaleTimeString()]
      localStorage.setItem('time',arr.join(' '))
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
  margin: 0 25px 0 275px;
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
  padding: 20px 0px 0 0px;
  height: 40px;
  overflow: hidden;
}
.header{
  margin: 0 0 10px 250px;
  height: 50px;
  background-color: black;
  overflow: hidden;
}
.header-left{
  color: white;
  margin: 20px 100px 0 10px;
}
.header-right{
  position:relative;
  top: -30px;
  float:right;
  right: 0;
  overflow: hidden;
  margin: 0 30px 0 0;
}
.right-page{
  margin: 10px 0 0 0;
  width: 100%;
  height: 79vh;
}
</style>