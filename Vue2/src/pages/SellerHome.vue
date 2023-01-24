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
      </el-menu>
    </div>
    <div class="rightbox">
      <template>
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane label="我的店铺" name="1">
            <MySellerManage></MySellerManage>
          </el-tab-pane>
          <el-tab-pane label="菜品管理" name="2">
              <el-tabs v-model="activeName1" type="border-card">
                <el-tab-pane label="发布菜品" name="2-1">
                    <PushDishe></PushDishe>
                </el-tab-pane>
                <el-tab-pane label="管理菜品" name="2-2">
                    <ManageDishe></ManageDishe>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
        </el-tabs>
      </template> 
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../components/home/Header.vue'
import MySellerManage from '../components/MySellerManage.vue'
import PushDishe from '../components/DishesManage/PushDishe.vue'
import ManageDishe from '../components/DishesManage/ManageDishe.vue'

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
      ManageDishe
    },
    computed:{
      ...mapState(['seller']),
    },
    methods:{
      handleSelect(key, keyPath) {
        this.activeName=key.split('-')?key.split('-')[0]:key
        this.activeName1=key.split('-')?key:this.activeName1
      },
      handleClick(key){

      }
    },
    mounted(){
      this.$store.dispatch('getSeller')
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