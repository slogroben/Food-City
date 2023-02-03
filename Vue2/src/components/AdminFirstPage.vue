<template>
  <div>
    <el-card class="userBox">
      <div class="userBox-top">
        <el-avatar v-if="user.imgurl" :size="150" :src="imgPath.userImg(user.imgurl)" ></el-avatar>
        <el-avatar v-if="!user.imgurl" :size="150" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" ></el-avatar>
        <div class="username">
          <h1 style="margin: 10px 0 10px 0;">{{user.username}}</h1>
          <span style="color: gray;font-size: 15px;" v-if="user.type==userType.root">超级管理员</span>
        </div>
      </div>
      <div class="userBox-botton">
        <div>
          <p v-if="lastTime"><span style="color: gray;font-size: 15px;">上次登录时间：</span>{{lastTime}}</p>
          <p v-if="!lastTime"><span style="color: gray;font-size: 15px;">登录时间：</span>{{lastTime}}</p>
        </div>
        <div>
          <p><span style="color: gray;font-size: 15px;">上次登录地点：</span>南昌</p>
        </div>
      </div>
  </el-card>
  <el-card class="userType">
    <div class="userType-chart"  ref="userType"></div>
  </el-card>
  <el-card class="bottonBox-left">
    <div class="bottonBox-left-chart" ref="boxleft"></div>
  </el-card>
  <el-card class="bottonBox-right">
    <div class="bottonBox-right-chart" ref="boxright"></div>
  </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import imgPath from '@/utils/imgPath'
import * as echarts from 'echarts'
import server from '@/utils/request'
export default {
    name:'AdminFirstPage',
    data(){
        return{
          imgPath,
          lastTime:'',
          option1:{
          title: {
            text: '各类用户占比数量',
            subtext: '来自数据库',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '数量',
              type: 'pie',
              radius: '50%',
              data: [],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        option2:{
          title: {
            text: '周订单数量',
            subtext: 'fake data',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ['一', '二', '三', '四', '五', '六', '天']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
        },
        option3:{
          title: {
            text: '',
            left:'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
            left:'left'
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        },
        }
    },
    computed:{
      ...mapState(['user','userType'])
    },
    methods:{
      ...mapActions(['checkUser']),
      userTypeImg(){
        let myechart1=echarts.init(this.$refs.userType)
        server.getReq('/admin/userTypeNum')
        .then(
          response=>{
            this.option1.series[0].data.push({value:response.data[this.userType.root],name:'超级管理员'})
            this.option1.series[0].data.push({value:response.data[this.userType.seller],name:'商家'})
            this.option1.series[0].data.push({value:response.data[this.userType.Normal],name:'普通用户'})  
            this.option1&&myechart1.setOption(this.option1)
          },
          error=>{

          }
        ) 
      },
      chart1(){
        let myechart=echarts.init(this.$refs.boxleft)
        this.option2&&myechart.setOption(this.option2)
      },
      chart2(){
        let myechart=echarts.init(this.$refs.boxleft)
        this.option2&&myechart.setOption(this.option2)
      },
      chart3(){
        let myechart=echarts.init(this.$refs.boxright)
        this.option3&&myechart.setOption(this.option3)
      }
    },
    mounted(){
      if(!localStorage.getItem('time')){
        let date=new Date()
        let arr=[date.toLocaleDateString(),date.toLocaleTimeString()]
        localStorage.setItem('time',arr.join(' '))
      }
      this.lastTime=localStorage.getItem('time')
      let token=localStorage.getItem('token')
      this.checkUser(token)
      this.userTypeImg()
      this.chart1()
      this.chart2()
      this.chart3()
    }
}
</script>

<style scoped>
.userBox{
  position: relative;
  width: 400px;
  height: 300px;
}
.userBox-top{
  border-bottom: 1px solid gray;
}
.username{
  position: absolute;
  top: 40px;
  left: 200px;
}
.userBox-botton{
  margin: 30px 0 0 30px;
}
.userType{
  position: absolute;
  left: 450px;
  top: 70px;
  width: 700px;
  height: 300px;
}
.userType-chart{
  width: 600px;
  height: 300px;
}
.bottonBox-left{
  position: absolute;
  margin: 30px 0 0 0;
  width: 350px;
  height: 300px;
}
.bottonBox-left-chart{
  width: 350px;
  height: 300px;
}
.bottonBox-right{
  position: absolute;
  margin: 30px 0 0 400px;
  width: 750px;
  height: 300px;
}
.bottonBox-right-chart{
  width: 750px;
  height: 300px;
}
</style>