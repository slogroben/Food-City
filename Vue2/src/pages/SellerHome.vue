<template>
  <div>
    <Header></Header>
    <div class="leftbox">
      <el-menu
        class="el-menu-vertical-demo"
        @select="handleSelect"
        style="width: 200px;">
        <el-menu-item index="1">
          我的店铺
        </el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate==$store.state.shopstate.review" disabled>审核中</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate==$store.state.shopstate.reject" disabled>入驻被拒绝</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate==$store.state.shopstate.quit" disabled>已经退出入驻</el-menu-item>
        <el-menu-item index="err" v-if="seller.shopstate==$store.state.shopstate.isquit" disabled>退出申请中</el-menu-item>
        <el-submenu index="2" v-if="seller.shopstate==$store.state.shopstate.operate">
          <template slot="title">菜品管理</template>
          <el-menu-item index="2-1">发布菜品</el-menu-item>
          <el-menu-item index="2-2">管理菜品</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-if="seller.shopstate==$store.state.shopstate.operate">
          <template slot="title">订单管理</template>
          <el-menu-item index="3-1">未支付</el-menu-item>
          <el-menu-item index="3-2">已支付</el-menu-item>
          <el-menu-item index="3-3">已完成</el-menu-item>
          <el-menu-item index="3-4">统计数据</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rightbox">
      <template>
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="我的店铺" name="1">
            <MySellerManage></MySellerManage>
          </el-tab-pane>
          <el-tab-pane label="菜品管理" name="2"  v-if="seller.shopstate==$store.state.shopstate.operate">
              <el-tabs v-model="activeName1" type="border-card">
                <el-tab-pane label="发布菜品" name="2-1">
                    <PushDishe></PushDishe>
                </el-tab-pane>
                <el-tab-pane label="管理菜品" name="2-2">
                    <ManageDishe></ManageDishe>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="订单管理" name="3"  v-if="seller.shopstate==$store.state.shopstate.operate">
              <el-tabs v-model="activeName1" type="border-card">
                <el-tab-pane label="未支付" name="3-1">
                    <NoPay></NoPay>
                </el-tab-pane>
                <el-tab-pane label="已支付" name="3-2">
                    <Pay></Pay>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="3-3">
                    <Finish></Finish>
                </el-tab-pane>
                <el-tab-pane label="统计数据" name="3-4">
                    <OrderData></OrderData>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
        </el-tabs>
      </template> 
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from '../components/home/Header.vue'
import MySellerManage from '../components/MySellerManage.vue'
import PushDishe from '../components/DishesManage/PushDishe.vue'
import ManageDishe from '../components/DishesManage/ManageDishe.vue'
import NoPay from '@/components/OrderManage/NoPay.vue'
import Pay from '@/components/OrderManage/Pay.vue'
import Finish from '@/components/OrderManage/Finish.vue'
import OrderData from '@/components/OrderManage/OrderData.vue'


export default {
    name:'SellerHome',
    data(){
      return{
          activeName:'1',
          activeName1:'2-1'
      }
    },
    components:{
    Header,
    MySellerManage,
    PushDishe,
    ManageDishe,
    NoPay,
    Pay,
    Finish,
    OrderData
},
    computed:{
      ...mapState(['seller']),
    },
    methods:{
      ...mapActions(['checkUser','getSeller']),
      handleSelect(key, keyPath) {
        this.activeName=key.split('-')?key.split('-')[0]:key
        this.activeName1=key.split('-')?key:this.activeName1
      },
      handleClick(key){

      }
    },
    mounted(){
      this.$store.dispatch('getSeller')
      this.checkUser()
      this.getSeller()
    }
    
}
</script>

<style scoped>
.leftbox{
  position: absolute;
  display: flex;
  height: 90vh;
}
.rightbox{
  position: relative;
  width: 900px;
  height:100%;
  left: 230px;
}
</style>