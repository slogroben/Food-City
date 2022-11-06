<template>
    <div>
      <Header></Header>
      <div class="left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :default-openeds="['1']"
          active-text-color="#ffd04b"
          @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
              <span>我的订单</span>
            </template>
              <el-menu-item index="1-1">全部订单</el-menu-item>
              <el-menu-item index="1-2">待付款</el-menu-item>
              <el-menu-item index="1-3">已付款</el-menu-item>
              <el-menu-item index="1-4">退款/售后</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right"> 
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部订单" name="first">
              <AllOrder></AllOrder>
            </el-tab-pane>
            <el-tab-pane label="待付款" name="second">
              <NopayOrder></NopayOrder>
            </el-tab-pane>
            <el-tab-pane label="已付款" name="third">
              <PayOrder></PayOrder>
            </el-tab-pane>
            <el-tab-pane label="退款/售后" name="fourth">
              <PayOrder></PayOrder>
            </el-tab-pane>
        </el-tabs>
          
      </div>
    </div>
</template>

<script>
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AllOrder from '@/components/order/AllOrder';
import NopayOrder from '../components/order/NopayOrder.vue';
import PayOrder from '@/components/order/PayOrder.vue';
export default {
    name: "OrderHome",
    data(){
        return{
          activeName:"first",
          activeIndex2: '1',
          orderflag:''
        }
    },
    components: { Header, Footer, AllOrder, NopayOrder, PayOrder },
    methods:{
      handleSelect(key, keyPath) {
        if(key=="1-1"){
          this.activeName="first"
        }
        if(key=="1-2"){
          this.activeName="second"
        }
        if(key=="1-3"){
          this.activeName="third"
        }
        if(key=="1-4"){
          this.activeName="fourth"
        }
      }
    }
}
</script>

<style scoped>
.left{
  /* position: absolute; */
  width: 300px;
  height: 500px;
  display: inline-block;
  margin: 0  0 0 125px;
}
.left>div{
  width: 200px;
  height: 50px;
  background-color: yellow;
  margin: 20px 50px 20px 50px;
}
.right{
  position: absolute;
  left: 425px;
  display: inline-block;
  width: 850px;
  height: 500px;
  margin: 0 0 0 55px;
}
</style>