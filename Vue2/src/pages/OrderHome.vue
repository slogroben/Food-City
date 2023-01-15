<template>
    <div>
      <Header></Header>
      <div class="left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :default-openeds="['1','2']"
          active-text-color="#ffd04b"
          @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">
              <span><i class="el-icon-tickets"></i>我的订单</span>
            </template>
              <el-menu-item index="1-1">全部订单</el-menu-item>
              <el-menu-item index="1-2">待付款</el-menu-item>
              <el-menu-item index="1-3">已付款</el-menu-item>
              <el-menu-item index="1-4">退款/售后</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span><i class="el-icon-star-off"></i>我的收藏</span>
            </template>
              <el-menu-item index="2-1">菜品收藏</el-menu-item>
              <el-menu-item index="2-2">店铺收藏</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right"> 
        <el-tabs v-model="first">
            <el-tab-pane label="我的订单" name="1">
              <el-tabs v-model="activeName" type="border-card">
                  <el-tab-pane label="全部订单" name="1-1">
                    <AllOrder @godishe="godishe"></AllOrder>
                  </el-tab-pane>
                  <el-tab-pane label="待付款" name="1-2">
                    <NopayOrder @godishe="godishe"></NopayOrder>
                  </el-tab-pane>
                  <el-tab-pane label="已付款" name="1-3">
                    <PayOrder @godishe="godishe"></PayOrder>
                  </el-tab-pane>
                  <el-tab-pane label="退款/售后" name="1-4">
                    <FinishOrder @godishe="godishe"></FinishOrder>
                  </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="我的收藏" name="2">
              <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="菜品收藏" name="2-1">
                  <DishesCollection @godishe="godishe"></DishesCollection>
                </el-tab-pane>
                <el-tab-pane label="店铺收藏" name="2-2">
                  <ShopCollection @goshop="goshop"></ShopCollection>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
import server from '@/utils/request';

import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AllOrder from '@/components/order/AllOrder';
import NopayOrder from '../components/order/NopayOrder.vue';
import PayOrder from '@/components/order/PayOrder.vue';
import DishesCollection from '@/components/order/DishesCollection.vue';
import ShopCollection from '@/components/order/ShopCollection.vue';
import FinishOrder from '@/components/order/FinishOrder.vue';

export default {
    name: "OrderHome",
    data(){
        return{
          first:'1',
          activeName:'1-1',
          orderflag:'',
          
        }
    },
    watch:{
      first:function(params){
        params=='2'?this.activeName='2-1':this.activeName='1-1'
      }
    }
    ,
    components: { Header, Footer, AllOrder, NopayOrder, PayOrder, DishesCollection, ShopCollection, FinishOrder },
    methods:{
      handleSelect(key, keyPath) {
          this.first=key.split('-')[0]
          this.activeName=key
      },
      godishe(o){
        console.log(o);
          let {dishes_id}=o
          server.getReq('/dishe/getDisheByDisheID?dishes_id='+dishes_id)
          .then(
              response=>{
                  this.$router.push({
                      name:'dishespage',
                      query:response.data
                  })
              }
          )
      },
      goshop(o){
          let {shop_id}=o
          server.getReq('/seller/getSellerByID?shop_id='+shop_id)
          .then(
              response=>{
                  this.$router.push({
                      name:'sellerpage',
                      query:response.data
                  })
              }
          )
      },
    },
    mounted(){
      if(Object.keys(this.$route.query).length!=0){
        this.first=this.$route.query.first
        this.activeName=this.$route.query.activeName
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